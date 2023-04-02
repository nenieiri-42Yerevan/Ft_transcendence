/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { UserDto } from '../dto';
import { Match, User } from '../entities';
import { AvatarService } from '../services/avatar.service';
import { UserService } from '../services/user.service';
import { Response } from 'express';
import { SessionService } from '../services/session.service';
export declare class UserController {
    private readonly userService;
    private readonly sessionService;
    private readonly avatarService;
    constructor(userService: UserService, sessionService: SessionService, avatarService: AvatarService);
    findAll(): Promise<User[]>;
    findBySession(rtoken: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    findById(id: number): Promise<User>;
    findAvatar(id: number, res: Response): Promise<StreamableFile>;
    findMatches(id: number): Promise<Match[]>;
    findFollows(id: number): Promise<User[]>;
    findBlocked(id: number): Promise<User[]>;
    updateUser(id: number, user: User): Promise<User>;
    updateAvatar(id: number, file: Express.Multer.File): Promise<void>;
    toggleUserFollowed(uid: number, tid: number): Promise<number[]>;
    toggleUserBlocked(uid: number, tid: number): Promise<number[]>;
    create(dto: UserDto): Promise<User>;
}
