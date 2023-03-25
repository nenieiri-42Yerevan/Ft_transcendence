import { User } from 'src/user/entities';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { Chat, Message } from '../entities';
export declare class ChatService {
    private readonly chatRepo;
    private readonly messageRepo;
    private readonly userService;
    constructor(chatRepo: Repository<Chat>, messageRepo: Repository<Message>, userService: UserService);
    createChat(users: User[]): Promise<Chat>;
    createMessage(chatId: number, userId: number, text: string): Promise<Message>;
    openChat(uid: number, tid: number): Promise<Chat>;
    findOne(chatId: number, relations?: string[]): Promise<Chat>;
    findAll(uid: number): Promise<Chat[]>;
    delete(chatId: number): Promise<void>;
}
