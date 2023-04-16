import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserService } from 'src/user/services/user.service';
import { GameOptions, Plan, Mode, Room, State, Player } from '../interfaces';
import { GameService } from './game.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly game: GameService,
    private readonly userService: UserService,
  ) {}

  /* Game Options associated with a room*/

  static options: GameOptions = Object.freeze({
    display: { width: 1920, height: 1080 },
    ball: { speed: 20, radius: 20 },
    tray: { width: 20, height: 200, x: 50 },
    score: { y: 15, max: 10 },
    input: { plan: Plan.DEFAULT, mode: Mode.NONE },
  });

  /* Placeholders for rooms and users */

  queue: Array<Socket> = [];
  rooms: Map<string, Room> = new Map();

  /* Public interface functions */

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static emit(room: Room, event: string, ...args: any): void {
    for (const player of room.players) player.socket.emit(event, ...args);

    if (room.spectators)
      for (const spectator of room.spectators) spectator.emit(event, ...args);
  }

  /* ******************** CREATE ******************** */

  createRoom(code: string = null): Room {
    while (!code) {
      const length = 10;
      const id = Math.random() * Math.pow(16, length);
      const generated = Math.floor(id).toString(16);

      if (!this.rooms.has(generated)) code = generated;
    }

    const room: Room = {
      code,
      state: State.WAITING,
      players: [],
      options: JSON.parse(JSON.stringify(RoomService.options)),
      ball: { position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 } },
      speed: 0,
    };
    this.rooms.set(code, room);

    return room;
  }

  joinRoom(socket: Socket, room: Room): void {
    if (room.state == State.WAITING) {
      const player: Player = {
        socket,
        user: socket.data.user,
        room,
        input: null,
        tray: RoomService.options.display.height / 2,
        score: 0,
      };

      room.players.push(player);

      if (room.players.length == 2) room.state = State.STARTING;
    } else {
      if (!room.spectators) room.spectators = [];
      room.spectators.push(socket);

      socket.emit(
        'ready',
        room.options,
        room.players.map((player) => player.user),
      );
    }

    socket.emit('room', room.code);
  }
}
