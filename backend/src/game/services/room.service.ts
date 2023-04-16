import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { GameOptions, Plan, Mode } from '../interfaces';
import { GameService } from './game.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly game: GameService,
    private readonly userService: UserService,
  ) {}

  static options: GameOptions = Object.freeze({
    display: { width: 1920, height: 1080 },
    ball: { speed: 20, radius: 20 },
    tray: { width: 20, height: 200, x: 50 },
    score: { y: 15, max: 10 },
    input: { plan: Plan.DEFAULT, mode: Mode.NONE },
  });
}
