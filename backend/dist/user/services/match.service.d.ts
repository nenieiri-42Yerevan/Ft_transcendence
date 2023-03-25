import { Repository } from 'typeorm';
import { Match } from '../entities';
export declare class MatchService {
    private readonly matchRepo;
    constructor(matchRepo: Repository<Match>);
    create(obj: Match): Promise<Match>;
    update(id: number, newMatch: Match): Promise<Match>;
    delete(id: number): Promise<void>;
}
