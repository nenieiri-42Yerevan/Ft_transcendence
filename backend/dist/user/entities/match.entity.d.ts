import { User } from './user.entity';
export declare class Match {
    id: number;
    score: number[];
    date: Date;
    winner: User;
    loser: User;
}
