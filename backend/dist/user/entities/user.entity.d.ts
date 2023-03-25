import { Chat } from 'src/chat/entities/chat.entity';
import { Avatar, Session, Match } from './index';
export type Gender = 'male' | 'female';
export declare enum Status {
    OFFLINE = 0,
    ONLINE = 1,
    GAME = 2,
    CHAT = 3
}
export declare class User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    gender: Gender;
    date_of_birth: Date;
    rank: number;
    status: Status;
    TFA_enabled: boolean;
    TFA_secret: string;
    created_at: Date;
    follows: number[];
    blocked: number[];
    avatar: Avatar;
    sessions: Session[];
    won: Match[];
    lost: Match[];
    chats: Chat[];
}
