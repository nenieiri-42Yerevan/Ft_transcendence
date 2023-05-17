import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from 'src/auth/auth.module';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { RoomService } from './services/room.service';
import { GameGateway } from './game.gateway';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ScheduleModule.forRoot(), AuthModule, UserModule],
  controllers: [GameController],
  providers: [GameService, RoomService, GameGateway],
})
export class GameModule {}
