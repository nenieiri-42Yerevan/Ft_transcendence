import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Socket } from 'socket.io';
import { Match } from 'src/user/entities';
import { MatchService } from 'src/user/services/match.service';
import { UserService } from 'src/user/services/user.service';
import {
  GameOptions,
  Plan,
  Mode,
  Room,
  State,
  Player,
  Input,
} from '../interfaces';
import { GameService } from './game.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly game: GameService,
    private readonly userService: UserService,
    private readonly matchService: MatchService,
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

  addSock(socket: Socket): void {
    for (const sock of this.queue)
      if (sock.data.user.id == socket.data.user.id) return;

    if (this.findPlayer(socket.data.user.id)) return;

    this.queue.push(socket);
    socket.emit('add', this.queue.length);
    if (this.queue.length < 2) return;

    const room: Room = this.createRoom();
    while (this.queue.length && room.players.length < 2)
      this.joinRoom(this.queue.shift(), room);
  }

  /* ******************** READ ******************** */

  findRoom(code: string): Room {
    return this.rooms.get(code);
  }

  findPlayer(uid: number): Player {
    for (const room of this.rooms.values())
      for (const player of room.players)
        if (player.user.id == uid) return player;
    return null;
  }

  findRoomForUser(uid: number): Room {
    const rooms = Array.from(this.rooms.values());
    const room = rooms.find(
      (room) => !!room.players.find((player) => player.user.id == uid),
    );

    if (!room) throw new HttpException('Room not found', HttpStatus.NOT_FOUND);

    return room;
  }

  /* ******************** UPDATE ******************** */

  startGame(room: Room): void {
    if (room.state != State.STARTING) return;

    for (const player of room.players) if (!player.input) return;

    room.state = State.COUNTDOWN;

    room.options.input.plan =
      room.players[Math.round(Math.random())].input.plan;
    room.options.input.mode =
      room.players[Math.round(Math.random())].input.mode;

    if (room.options.input.mode == Mode.SPEED) {
      room.options.ball.radius = 25;
      room.options.ball.speed = 30;
    } else if (room.options.input.mode == Mode.SMALL)
      room.options.tray.height = 100;

    RoomService.emit(
      room,
      'ready',
      room.options,
      room.players.map((player) => player.user),
    );
  }

  async stopGame(room: Room, player: Player): Promise<void> {
    if (!player) return;
    if (room.state == State.END) return;
    room.state = State.END;

    if (room.players.length == 2) {
      const loser = room.players.find(
        (player1) => player1.user.id != player.user.id,
      ).user;
      const winner = player.user;
      const score = room.players.map((player) => player.score);

      room.players.forEach(player => this.deleteSock(player.socket));
      await this.userService.updateLevel(winner, loser);
      await this.matchService.create({
        score,
        winner,
        loser,
      } as Match);
    }
  }

  ready(player: Player, input: Input): void {
    player.input = input;
    this.startGame(player.room);
  }

  startCalc(room: Room): void {
    if (room.state != State.COUNTDOWN) return;

    this.game.resetBall(room);
    room.state = State.INGAME;
  }

  @Interval(1000 / 60)
  loop(): void {
    for (const room of this.rooms.values())
      if (room.state == State.INGAME) this.game.updateGame(room);
  }

  /* ******************** DELETE ******************** */

  async deleteSock(socket: Socket): Promise<any> {
    if (this.queue.indexOf(socket) != -1)
      return this.queue.splice(this.queue.indexOf(socket), 1);

    for (const room of this.rooms.values()) {
      if (room.spectators && room.spectators.indexOf(socket) != -1)
        return room.spectators.splice(room.spectators.indexOf(socket), 1);

      for (const player of room.players)
        if (player.socket.id == socket.id) {
          await this.stopGame(
            room,
            room.players.find((player1) => player1.user.id != player.user.id),
          );
          room.players.splice(room.players.indexOf(player), 1);
          break;
        }

      if (!room.players.length) return this.rooms.delete(room.code);
    }
  }
}
