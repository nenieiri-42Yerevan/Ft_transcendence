import { User } from 'src/user/entities';
import { Banned, Message, Muted } from '../entities';
export declare class GroupChatDto {
    name: string;
    public: boolean;
    password: string;
    owner: User;
    admins: number[];
    muted: Muted[];
    banned: Banned[];
    users: User[];
    messages: Message[];
}
