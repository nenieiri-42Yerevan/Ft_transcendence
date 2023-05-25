import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Status } from '../user/entities/user.entity';

@Injectable()
export class NotifyService {
  @WebSocketServer()
  server: Server;

  emitStatus(uid: number, status: Status): void {
    if (this.server) {
        this.server.emit('status', { uid, status });
    }
  }
}
