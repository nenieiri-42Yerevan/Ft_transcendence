import { Message } from './message.entity';
import { User } from 'src/user/entities';
export declare class Chat {
    id: number;
    users: User[];
    messages: Message[];
}
