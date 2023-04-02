import { Server } from 'socket.io';
import { Status } from 'src/user/entities/user.entity';
export declare class SocketService {
    server: Server;
    emitStatus(uid: number, status: Status): void;
}
