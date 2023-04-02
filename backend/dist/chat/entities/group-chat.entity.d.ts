import { User } from 'src/user/entities';
import { Muted } from './muted.entity';
import { Banned } from './banned.entity';
import { Chat } from './chat.entity';
import { Message } from './message.entity';
export declare class GroupChat extends Chat {
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
