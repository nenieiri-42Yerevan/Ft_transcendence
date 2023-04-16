import { Player } from './player.interface';
import { Socket } from 'socket.io';
import { GameOptions } from './options.interface';

export interface Position {
  x: number;
  y: number;
}

interface Ball {
  position: Position;
  velocity: Position;
}

export enum State {
  WAITING,
  STARTING,
  COUNTDOWN,
  INGAME,
  END,
}

export interface Room {
  code: string;
  state: State;
  players: Array<Player>;
  spectators?: Array<Socket>;
  options: GameOptions;
  ball: Ball;
  speed: number;
}
