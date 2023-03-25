import { User } from 'src/user/entities';
import { Chat } from './chat.entity';
export declare class Message {
    id: number;
    content: string;
    author: User;
    chat: Chat;
}
