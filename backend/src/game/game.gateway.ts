import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/services/auth.service';
import { Input } from './interfaces/input.interface';
import { RoomService } from './services/room.service';
import { Player } from './interfaces/player.interface';
import { Room } from './interfaces/room.interface';
import { UserService } from 'src/user/services/user.service';
import { Status } from 'src/user/entities';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'pong',
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
  ) {}
  @WebSocketServer()
  server: any;

  async handleConnection(client: Socket): Promise<any> {
    try {

      const user = await this.authService.retrieveUser(client);
      if (!user) { return client.disconnect(); }

      // await this.userService.setStatus(user.id, Status.GAME);

      client.data.user = user;
      client.emit('info', { user });
    } catch (ex){
      console.log(ex);
    }
  }

  async handleDisconnect(client: Socket): Promise<any> {
    try {
      if (!client.data.user) return;

      await this.roomService.deleteSock(client);
      // await this.userService.setStatus(client.data.user.id, Status.ONLINE);
    } catch {}
  }

  @SubscribeMessage('add')
  joinQueue(client: Socket): void {
    try {
      if (!client.data.user) {
          return;
      }
      this.roomService.addSock(client);
    } catch {}
  }
 


  @SubscribeMessage('join-room')
  joinRoom(client: Socket, code?: string): void {
    try {
      if (!client.data.user) return;

      let room: Room = this.roomService.findRoom(code);
      if (!room) room = this.roomService.createRoom(code);

      this.roomService.joinRoom(client, room);
    } catch {}
  }

  @SubscribeMessage('ready')
  onReady(client: Socket, input: Input): void {
    try {

      if (!client.data.user) return;

      const player: Player = this.roomService.findPlayer(client.data.user.id);
      if (!player) return;

      this.roomService.ready(player, input);
    } catch {}
  }

  @SubscribeMessage('start')
  onStart(client: Socket): void {
    try {
      if (!client.data.user) return;

      const player: Player = this.roomService.findPlayer(client.data.user.id);
      if (!player || !player.room) return;

      this.roomService.startCalc(player.room);
    } catch {}
  }

  @SubscribeMessage('update-tray')
  updateTray(client: Socket, tray: number): void {
    try {
      if (!client.data.user) return;

      const player: Player = this.roomService.findPlayer(client.data.user.id);
      if (!player) return;

      player.tray = tray * player.room.options.display.height;
      const playerIndex = player.room.players.indexOf(player);
      RoomService.emit(player.room, 'tray', playerIndex, tray);
    } catch {}
  }
}
