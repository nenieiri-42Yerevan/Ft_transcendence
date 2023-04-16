import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RoomService } from '../services/room.service';

@Controller('game')
export class GameController {
  constructor(private readonly roomservice: RoomService) {}

  @Get('/:id')
  findRoomForUser(@Param('id', ParseIntPipe) id: number): string {
    return this.roomservice.findRoomForUser(id).code;
  }
}
