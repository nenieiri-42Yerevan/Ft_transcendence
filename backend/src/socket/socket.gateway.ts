import { ConfigService } from '@nestjs/config';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { Status } from 'src/user/entities';
import { UserService } from 'src/user/services/user.service';
import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: { origin: '' },
  namespace: 'notify',
})
export class SocketGateway {
  constructor(
    private readonly configService: ConfigService,
    private readonly socketService: SocketService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer()
  server;

  afterInit(srv: Server): void {
    this.socketService.server = srv;

    const origin = this.configService.get<string>('FRONT_URL');
    Object.assign(this.server, { cors: { origin } });
  }

  async onConnect(client: Socket): Promise<any> {
    try {
      const user = await this.authService.retrieveUser(client);
      if (!user) client.disconnect();

      await this.userService.setStatus(user.id, Status.ONLINE);
    } catch {}
  }
}
