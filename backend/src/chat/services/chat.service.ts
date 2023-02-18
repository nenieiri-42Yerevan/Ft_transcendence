import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { Chat, Message } from '../entities';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,

    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,

    private readonly userService: UserService,
  ) {}

  /* CREATE */

  async create(users: User[]): Promise<Chat> {
    if (users.length > 2)
      throw new HttpException(
        'Too many users for a chat',
        HttpStatus.NOT_ACCEPTABLE,
      );

    const chat = this.chatRepo.create({ users });

    try {
      await this.chatRepo.save(chat);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return chat;
  }

  /* READ */

  async findOne(id: number, relations = [] as string[]): Promise<Chat> {
    let chat = null;

    if (id) chat = await this.chatRepo.findOne({ where: { id }, relations });

    if (!chat) throw new HttpException('Chat not found!', HttpStatus.NOT_FOUND);

    return chat;
  }
}
