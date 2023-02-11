import { ConfigService } from '@nestjs/config';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: { origin: '' },
  namespace: 'notify',
})
export class SocketGateway {
  constructor(
    private readonly configService: ConfigService,
    private readonly socketService: SocketService,
  ) {}

  @WebSocketServer()
  server;

  afterInit(srv: Server): void {
    this.socketService.server = srv;

    const origin = this.configService.get<string>('FRONT_URL');
    Object.assign(this.server, { cors: { origin } });
  }
}
