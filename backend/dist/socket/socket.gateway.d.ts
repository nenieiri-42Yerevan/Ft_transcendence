import { ConfigService } from '@nestjs/config';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { UserService } from 'src/user/services/user.service';
import { SocketService } from './socket.service';
export declare class SocketGateway {
    private readonly configService;
    private readonly socketService;
    private readonly authService;
    private readonly userService;
    constructor(configService: ConfigService, socketService: SocketService, authService: AuthService, userService: UserService);
    server: any;
    afterInit(srv: Server): void;
    onConnect(client: Socket): Promise<any>;
    onDisconnect(client: Socket): void;
    onMessage(client: Socket, data: any): void;
}
