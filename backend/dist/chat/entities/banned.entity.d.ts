import { User } from 'src/user/entities';
import { GroupChat } from './group-chat.entity';
export declare class Banned {
    id: number;
    endOfBan: Date;
    user: User;
    group: GroupChat;
}
