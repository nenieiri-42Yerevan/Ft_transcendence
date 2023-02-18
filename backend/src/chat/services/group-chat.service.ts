import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { GroupChatDto } from '../dto/group-chat.dto';
import { Banned, GroupChat, Message, Muted } from '../entities';
import * as argon from 'argon2';
import { PasswordDto } from '../dto/password.dto';

@Injectable()
export class GroupChatService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(GroupChat)
    private readonly groupChatRepo: Repository<GroupChat>,

    @InjectRepository(GroupChat)
    private readonly messageRepo: Repository<Message>,

    @InjectRepository(Muted)
    private readonly mutedUserRepo: Repository<Muted>,

    @InjectRepository(Banned)
    private readonly bannedUserRepo: Repository<Banned>,

    @InjectRepository(Message)
    private readonly logRepository: Repository<Message>,
  ) {}

  /* CREATE */

  async createGroupChat(gchat: GroupChatDto, uid: number): Promise<GroupChat> {
    const admin = await this.userService.findOne(uid);
    let hash = null;

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
        hash = argon.hash(gchat.password);
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
    let gchat = null;

    if (groupId)
      gchat = await this.groupChatRepo.findOne({
        where: { id: groupId },
        relations,
      });

    if (!gchat)
      throw new HttpException('Group Chat not found', HttpStatus.NOT_FOUND);

    if (!needPass) delete gchat.password;

    return gchat;
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
        'Wrong credentials provided',
        HttpStatus.FORBIDDEN,
      );

    try {
      const password = await argon.hash(pass.newPassword);
      await this.groupChatRepo.update(gchat.id, { password });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async checkPassword(id: number, password: string): Promise<boolean> {
    if (!password) return false;

    const gchat = await this.findOne(id, [], true);
    if (!gchat) return false;

    return await argon.verify(gchat.password, password);
  }

  /* DELETE */

  async delete(id: number): Promise<void> {
    const gchat = await this.findOne(id, ['users', 'muted', 'banned', 'logs']);

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
    } else if (user.id == gchat.owner.id) return await this.delete(gchat.id);

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
}
