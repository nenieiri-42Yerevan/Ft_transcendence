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

  async createChat(users: User[]): Promise<Chat> {
    if (users.length > 2)
      throw new HttpException(
        'Too many users for a chat',
        HttpStatus.NOT_ACCEPTABLE,
      );
      
    const chat = this.chatRepo.create({ users });
    // console.log("chaaaat:", chat);
    try {
      await this.chatRepo.save(chat);
      // console.log("chasst:", await this.chatRepo.find({where: {users: {id: users[0].id}}, relations:['users']}));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return chat;
  }

  async createMessage(
    chatId: number,
    userId: number,
    text: string,
  ): Promise<Message> {
    const chat = await this.findOne(chatId, ['users']);
    if (!chat) throw new HttpException('Chat not found!', HttpStatus.NOT_FOUND);

    const sender = await this.userService.findOne(userId);
    if (!sender)
      throw new HttpException('Sender not found!', HttpStatus.NOT_FOUND);

    const reciever = chat.users.find((user) => user.id != sender.id);
    if (!reciever)
      throw new HttpException('Receiver not found!', HttpStatus.NOT_FOUND);

    // if (reciever.blocked.includes(sender.id))
    //   throw new HttpException('User is blocked!', HttpStatus.CONFLICT);

    const message = this.messageRepo.create({ content: text, author: sender });

    try {
      await this.messageRepo.save(message);
      await this.chatRepo
        .createQueryBuilder()
        .relation(Chat, 'messages')
        .of(chat)
        .add(message);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return message;
  }

  async openChat(uid: number, tid: number): Promise<Chat> {
    if (uid == tid)
      throw new HttpException(
        'Users cannot creat chat with themselves',
        HttpStatus.FORBIDDEN,
      );

    const user = await this.userService.findOne(uid);
    const target = await this.userService.findOne(tid);
    
    const uchats = await this.findAll(uid);
    const tchats = await this.findAll(tid);
    const intersection = uchats.filter((chat1) =>
      tchats.some((chat2) => chat2.id === chat1.id),
    );

    if (intersection.length !== 0) return intersection[0];

    return await this.createChat([user, target]);
  }

  /* READ */

  async findOne(chatId: number, relations = [] as string[]): Promise<Chat> {
    let chat = null;

    if (chatId)
      chat = await this.chatRepo.findOne({ where: { id: chatId }, relations });

    if (!chat) throw new HttpException('Chat not found!', HttpStatus.NOT_FOUND);

    return chat;
  }

  async findAll(uid: number): Promise<Chat[]> {
    const chats = await this.chatRepo.find({
      relations: ['users', 'messages'],
    });

    const userChats: Chat[] = [];

    chats.forEach((entity: Chat) => {
      if (entity.users[0].id === uid || entity.users[1].id === uid)
        userChats.push(entity);
    });

    return userChats;
  }

  /* DELETE */

  async delete(chatId: number): Promise<void> {
    const chat = await this.findOne(chatId, ['messages']);

    try {
      await this.messageRepo.remove(chat.messages);
      await this.chatRepo.delete(chat.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
