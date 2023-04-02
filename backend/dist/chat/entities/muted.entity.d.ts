import { User } from 'src/user/entities';
import { GroupChat } from './group-chat.entity';
export declare class Muted {
    id: number;
    endOfMute: Date;
    user: User;
    group: GroupChat;
}
