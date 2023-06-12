import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { GroupChatDto } from '../dto/group-chat.dto';
import { Banned, GroupChat, Muted } from '../entities';
import * as argon from 'argon2';
import { PasswordDto } from '../dto/password.dto';
import { WsException } from '@nestjs/websockets';
import { GroupMessage } from '../entities/group-message.entity';

const temporary = 30 * 60 * 1000;
@Injectable()
export class GroupChatService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(GroupChat)
    private readonly groupChatRepo: Repository<GroupChat>,

    @InjectRepository(GroupMessage)
    private readonly messageRepo: Repository<GroupMessage>,

    @InjectRepository(Muted)
    private readonly mutedUserRepo: Repository<Muted>,

    @InjectRepository(Banned)
    private readonly bannedUserRepo: Repository<Banned>,

    @InjectRepository(GroupMessage)
    private readonly logRepository: Repository<GroupMessage>,
  ) {}

  /* CREATE */

  async createGroupChat(gchat: GroupChatDto, uid: number): Promise<GroupChat> {
    const admin = await this.userService.findOne(uid);
    let hash = null;

    if (gchat != null)
        gchat.name = gchat.name.replace(/\s+/g, '');
    // Chat name validation
    if (gchat.name == undefined)
      throw new HttpException(
        'Group Chat must have a name!',
        HttpStatus.FORBIDDEN,
      );
    
    // Private chat processing
    if (gchat.public == false) {
      if (!gchat.password)
        throw new HttpException('Password required!', HttpStatus.FORBIDDEN);

      if (gchat.password.length > 16)
        throw new HttpException('Password is too long!', HttpStatus.FORBIDDEN);

      try {
        hash = await argon.hash(gchat.password);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }

    // Chat name uniqueness check
    let exists = await this.groupChatRepo.findOne({
      where: { name: gchat.name },
    });
    if (exists)
      throw new HttpException(
        'Group Chat already exists',
        HttpStatus.FORBIDDEN,
      );

    // GroupChat info initialization
    const chat = this.groupChatRepo.create({
      name: gchat.name,
      public: gchat.public !== false,
      password: hash,
      owner: admin,
      admins: [admin.id],
      users: [admin],
    });

    // Saving the chat in database
    try {
      await this.groupChatRepo.save(chat);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    delete chat.password;
    return chat;
  }

  /* READ */

  async findOne(
    groupId: number,
    relations = [] as string[],
    needPass?: boolean,
  ): Promise<GroupChat> {

    
    const gchat = await this.groupChatRepo.findOne({
        where: { id: groupId },
        relations,
      });

    if (!gchat) {
        throw new HttpException('Group Chat not found', HttpStatus.NOT_FOUND);
    }

    if (!needPass) delete gchat.password;

    return gchat;
  }

  async findAll(): Promise<GroupChat[]> {
    const gchats = await this.groupChatRepo.find();

    gchats.forEach((chat) => delete chat.password);
    return gchats;
  }

  async findUserGroups(uid: number): Promise<GroupChat[]> {
    const user = await this.userService.findOne(uid);

    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const uncompleted: GroupChat[] = await this.groupChatRepo
      .createQueryBuilder('gchat')
      .innerJoin('gchat.users', 'user')
      .where('user.id = :uid', { uid })
      .getMany();

    const unresolved: Promise<GroupChat>[] = uncompleted.map((gchat) =>
      this.findOne(gchat.id, ['users', 'muted', 'banned', 'messages']),
    );

    return await Promise.all(unresolved);
  }

  /* UPDATE */

  async updatePassword(
    pass: PasswordDto,
    gid: number,
    uid: number,
  ): Promise<void> {
    if (pass.newPassword.length > 16)
      throw new HttpException('New password is too long', HttpStatus.FORBIDDEN);

    const user = await this.userService.findOne(uid);
    const gchat = await this.findOne(gid);

    if (gchat.public == true)
      throw new HttpException('Group Chat is public', HttpStatus.FORBIDDEN);

    if (gchat.owner.id != user.id)
      throw new HttpException(
        'User does not have premission',
        HttpStatus.FORBIDDEN,
      );

    if (!pass.newPassword)
      throw new HttpException(
        'New password cannot be empty',
        HttpStatus.FORBIDDEN,
      );

    if (!(await this.checkPassword(gchat.id, pass.oldPassword)))
      throw new HttpException(
        'Wrong old password',
        HttpStatus.FORBIDDEN,
      );

    try {
      const password = await argon.hash(pass.newPassword);
      await this.groupChatRepo.update(gchat.id, { password });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addUser(gchat: GroupChat, uid: number): Promise<void> {
    const user = await this.userService.findOne(uid);
    const chat = await this.findOne(gchat.id, ['users', 'banned'], true);

    if (!chat.public) {
      let valid = true;


      if (chat.password)
        valid = await argon.verify(chat.password, gchat.password);
      if (!valid)
        throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN);
    }

    for (const banned of chat.banned) {
      if (banned.user.id == user.id) {
        const time = new Date();

        if (banned.endOfBan > time)
          throw new HttpException('User is banned!', HttpStatus.FORBIDDEN);

        await this.unbannUser(banned, chat);
      }
    }

    console.log(chat);
    if (chat.users.find((user1) => user1.id == user.id))
      throw new HttpException('User is already in group!', HttpStatus.CONFLICT);

    await this.groupChatRepo
      .createQueryBuilder()
      .relation(GroupChat, 'users')
      .of(chat)
      .add(user);
  }

  async bannUser(uid: number, gchatId: number, adminId: number): Promise<void> {
    const admin = await this.userService.findOne(adminId);
    const user = await this.userService.findOne(uid);
    const chat = await this.findOne(gchatId, ['users', 'banned']);

    if (chat.owner.id == user.id)
      throw new HttpException(
        'The owner cannot be banned!',
        HttpStatus.FORBIDDEN,
      );

    if (!chat.users.find((u) => u.id == user.id))
      throw new HttpException(
        'User is not in the group!',
        HttpStatus.NOT_FOUND,
      );

    if (!chat.admins.find((adminId) => adminId == admin.id))
      throw new HttpException(
        'User is not an admin in this group!',
        HttpStatus.FORBIDDEN,
      );

    if (chat.banned.find((banned) => banned.user.id == user.id))
      throw new HttpException('User is already banned!', HttpStatus.FORBIDDEN);

    const time = new Date(Date.now() + temporary);
    const banned = this.bannedUserRepo.create({
      user,
      endOfBan: time,
      group: chat,
    });

    chat.users.splice(
      chat.users.findIndex((u) => u.id == user.id),
      1,
    );

    try {
      await this.groupChatRepo.save(chat);
      await this.bannedUserRepo.save(banned);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async muteUser(uid: number, gchatId: number, adminId: number): Promise<void> {
    const user = await this.userService.findOne(uid);
    const admin = await this.userService.findOne(adminId);
    const chat = await this.findOne(gchatId, ['users', 'muted']);

    if (chat.owner.id == user.id)
      throw new HttpException(
        'The owner cannot be muted!',
        HttpStatus.FORBIDDEN,
      );

    if (!chat.users.find((u) => u.id == user.id))
      throw new HttpException(
        'User is not in the group!',
        HttpStatus.NOT_FOUND,
      );

    if (!chat.admins.find((adminId) => adminId == admin.id))
      throw new HttpException(
        'User is not an admin in this group!',
        HttpStatus.FORBIDDEN,
      );

    if (chat.muted.find((u) => u.user.id == user.id))
      throw new HttpException('User is already muted!', HttpStatus.FORBIDDEN);

    const time = new Date(Date.now() + temporary);
    const muted = this.mutedUserRepo.create({
      user,
      endOfMute: time,
      group: chat,
    });

    try {
      await this.mutedUserRepo.save(muted);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addMessage(id: number, message: string, uid: number): Promise<void> {
    const user = await this.userService.findOne(uid);

    const chat: GroupChat = await this.findOne(id, ['users', 'messages', 'muted']);
    if (!chat.users.find((u) => u.id == user.id)) {
      throw new HttpException('User is not in the group', HttpStatus.NOT_FOUND);
    }

      const muted = chat.muted.find((u) => u.user.id == user.id);

      if (muted) {
        const time = new Date();

        if (muted.endOfMute > time)
          throw new HttpException(
            'User is muted from this group!',
            HttpStatus.FORBIDDEN,
          );

        await this.unmuteUser(muted, chat);
      }

    const log = this.logRepository.create({
      content: message,
      author: user,
    });

    try {
      await this.logRepository.save(log);
      await this.groupChatRepo
        .createQueryBuilder()
        .relation(GroupChat, 'messages')
        .of(chat)
        .add(log);
    } catch (error) {
        console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async toggleAdmin(ownerId: number, uid: number, gid: number): Promise<void> {
    const owner = await this.userService.findOne(ownerId);
    const user = await this.userService.findOne(uid);
    const gchat = await this.findOne(gid, ['users']);
    if (gchat.owner.id != owner.id)
      throw new WsException("User isn't the channel's owner");

    if (user.id == gchat.owner.id)
      throw new WsException('Owner cannot be demoted');

    if (!gchat.users.find((user1) => user1.id == user.id))
      throw new WsException("User getting promoted isn't part of the channel");

    {
      const index = gchat.admins.indexOf(user.id);
      if (index == -1) gchat.admins.push(user.id);
      else gchat.admins.splice(index, 1);
    }

    try {
      await this.groupChatRepo.save(gchat);
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  /* DELETE */

  async delete(id: number): Promise<void> {
    const gchat = await this.findOne(id, [
      'users',
      'muted',
      'banned',
      'messages',
    ]);

    if (!gchat)
      throw new HttpException(
        'The group chat does not exist',
        HttpStatus.BAD_REQUEST,
      );

    await this.messageRepo.remove(gchat.messages);
    await this.mutedUserRepo.remove(gchat.muted);
    await this.bannedUserRepo.remove(gchat.banned);
    await this.groupChatRepo.remove(gchat);
  }

  async deleteUserFromGroup(
    uid: number,
    gid: number,
    admin?: number,
  ): Promise<void> {
    const user = await this.userService.findOne(uid);
    const gchat = await this.findOne(gid, ['users']);

    if (admin && admin != user.id) {
      if (gchat.admins.indexOf(admin) == -1)
        throw new HttpException(
          "User isn't admin in the group",
          HttpStatus.FORBIDDEN,
        );

      if (user.id == gchat.owner.id)
        throw new HttpException('Cannot kick the owner', HttpStatus.FORBIDDEN);

      const index = gchat.admins.indexOf(user.id);
      if (index != -1) gchat.admins.splice(index, 1);
    } else if (user.id == gchat.owner.id) {
        console.log("Admin delete own group");
        return await this.delete(gchat.id);
    }

    {
      const index = gchat.users.findIndex((user1) => user1.id == user.id);
      if (index == -1)
        throw new HttpException(
          'User is not in the group',
          HttpStatus.NOT_FOUND,
        );
      gchat.users.splice(index, 1);
    }

    try {
      await this.groupChatRepo.save(gchat);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async unbannUser(user: Banned, gchat: GroupChat): Promise<void> {
    const index = gchat.banned.findIndex((user1) => user1.id == user.id);

    if (index == -1) return;

    await this.bannedUserRepo.delete(user.id);
  }

  async unmuteUser(user: Muted, gchat: GroupChat): Promise<void> {
    const index = gchat.muted.findIndex((user1) => user1.id == user.id);
    if (index == -1) return;

    await this.mutedUserRepo.delete(user.id);
  }

  /* UTILS */

  async checkPassword(id: number, password: string): Promise<boolean> {
    if (!password) return false;

    const gchat = await this.findOne(id, [], true);
    if (!gchat) return false;

    return await argon.verify(gchat.password, password);
  }
}
