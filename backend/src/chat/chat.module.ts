import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Chat, GroupChat, Message, Muted, Banned } from './entities';

let entities = [Chat, GroupChat, Message, Muted, Banned];

@Module({
  imports: [TypeOrmModule.forFeature(entities), AuthModule],
  controllers: [],
  providers: [],
})
export class ChatModule {}
