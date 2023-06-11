import { ConfigService } from '@nestjs/config';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { Status } from 'src/user/entities';
import { UserService } from 'src/user/services/user.service';
import { NotifyService } from './notify.service';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'notify',
})
export class NotifyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly configService: ConfigService,
    private readonly notifyService: NotifyService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer()
  server: any;

  afterInit(srv: Server): void {
    this.notifyService.server = srv;
    
    const origin = this.configService.get<string>('FRONT_URL');
    Object.assign(this.server, { cors: { origin } });
  }

  async handleConnection(client: Socket): Promise<any> {
    try {
      const user = await this.authService.retrieveUser(client);
      if (!user) client.disconnect();
      
      await this.userService.setStatus(user.id, Status.ONLINE);

      client.data.user = user;
    } catch {}
  }

  handleDisconnect(client: Socket): void {
    try {
      if (!client.data.user) return;

      const uid = client.data.user.id;
      console.log("uid:", uid);
     
      setTimeout(async () => {
        const socket: any = Array.from(this.server.sockets.values())?.find(
          (socket: Socket) => socket?.data?.user?.id == uid,
        );

        if (socket) return;

        const user = await this.userService.findOne(uid);
        if (!user) return;
        
        await this.userService.setStatus(uid, Status.OFFLINE);
      }, 5 * 1000);
    } catch {}
  }

  @SubscribeMessage('message')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onMessage(client: Socket, data: any): void {
    try {
        console.log(data);
      const user = client.data.user;
      if (!user) return;

      const socket: any = Array.from(this.server.sockets.values())?.find(
        (socket: Socket) => socket.data.user.id == data.id,
      );
      if (!socket) client.emit('error', 'User offline!');
      else {
        data.id = user.id;
        socket.emit('message', data);
      }
    } catch {}
  }
}
