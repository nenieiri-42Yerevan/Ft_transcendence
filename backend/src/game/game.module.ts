import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ScheduleModule.forRoot(), AuthModule],
  controller: [],
  providers: [],
})
export class Game {}
