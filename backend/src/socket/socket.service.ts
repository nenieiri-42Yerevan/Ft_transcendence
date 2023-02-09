import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Status } from 'src/user/entities/user.entity';

@Injectable()
export class SocketService {
  @WebSocketServer()
  server: Server;

  emitStatus(uid: number, status: Status): void {
    this.server.emit('status', { uid, status });
  }
}
