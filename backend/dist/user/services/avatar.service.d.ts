/// <reference types="node" />
import { StreamableFile } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Avatar, User } from '../entities';
export declare class AvatarService {
    private readonly avatarRepo;
    constructor(avatarRepo: Repository<Avatar>);
    create(file: string, user: User, data: Buffer): Promise<Avatar>;
    update(id: number, newAvatar: Avatar): Promise<Avatar>;
    toStreamableFile(data: Buffer): StreamableFile;
    delete(id: number): Promise<void>;
}
