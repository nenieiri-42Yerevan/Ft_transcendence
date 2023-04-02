/// <reference types="node" />
import { User } from './user.entity';
export declare class Avatar {
    id: number;
    file: string;
    data: Buffer;
    user: User;
}
