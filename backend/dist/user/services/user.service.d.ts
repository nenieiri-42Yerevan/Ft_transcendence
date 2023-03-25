/// <reference types="multer" />
import { Repository } from 'typeorm';
import { User, Avatar, Status, Match } from '../entities/';
import { UserDto } from '../dto';
import { AvatarService } from './avatar.service';
export declare class UserService {
    private readonly avatarService;
    private readonly userRepo;
    private readonly matchRepo;
    constructor(avatarService: AvatarService, userRepo: Repository<User>, matchRepo: Repository<Match>);
    create(dto: UserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(property: any, relations?: string[]): Promise<User>;
    findAvatar(id: number): Promise<Avatar>;
    findMatches(id: number): Promise<Match[]>;
    findFollows(id: number): Promise<User[]>;
    findBlocked(id: number): Promise<User[]>;
    update(id: number, newUser: User): Promise<User>;
    updateLevel(winner: User, loser: User): Promise<void>;
    setStatus(id: number, status: Status): Promise<void>;
    setAvatar(id: number, file: Express.Multer.File): Promise<void>;
    toggleFollow(uid: number, tid: number): Promise<number[]>;
    toggleBlock(uid: number, tid: number): Promise<number[]>;
    delete(id: number): Promise<User>;
}
