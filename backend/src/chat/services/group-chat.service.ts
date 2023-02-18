import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { GroupChatDto } from '../dto/GroupChat.dto';
import { Banned, GroupChat, Message, Muted } from '../entities';
import * as argon from 'argon2';

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

  /* DELETE */

  async delete(id: number): Promise<void> {
    const gchat = await this.findOne(id, ['users', 'muted', 'banned', 'logs']);

    await this.messageRepo.remove(gchat.messages);
    await this.mutedUserRepo.remove(gchat.muted);
    await this.bannedUserRepo.remove(gchat.banned);
    await this.groupChatRepo.remove(gchat);
  }
}
