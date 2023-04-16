import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from 'src/auth/auth.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [ScheduleModule.forRoot(), AuthModule],
  controllers: [GameController],
  providers: [GameService],
})
export class Game {}