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
  server: any;

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

  onDisconnect(client: Socket): void {
    try {
      if (!client.data.user) return;

      const uid = client.data.user.id;

      setTimeout(async () => {
        const socket: any = Array.from(this.server.sockets.values()).find(
          (socket: Socket) => socket.data.user.id == uid,
        );

        if (socket) return;

        const user = await this.userService.findOne(uid);
        if (!user) return;

        if (user.status == Status.ONLINE)
          await this.userService.setStatus(uid, Status.OFFLINE);
      }, 5 * 1000);
    } catch {}
  }
}
