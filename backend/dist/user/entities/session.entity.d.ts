import { User } from './user.entity';
export declare class Session {
    id: number;
    access_token: string;
    refresh_token: string;
    owner: User;
}
