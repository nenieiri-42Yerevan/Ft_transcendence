import { Repository } from 'typeorm';
import { Session, User } from '../entities';
export declare class SessionService {
    private readonly sessionRepo;
    constructor(sessionRepo: Repository<Session>);
    create(access_token: string, refresh_token: string, owner: User): Promise<Session>;
    findOneBytoken(rtoken: string): Promise<User>;
    read_AT(access_token: string): Promise<Session>;
    read_RT(refresh_token: string): Promise<Session>;
    update(id: number, session: Session): Promise<Session>;
    delete(id: number): Promise<void>;
}
