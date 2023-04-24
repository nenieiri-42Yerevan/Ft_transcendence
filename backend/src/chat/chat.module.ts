import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from './chat.gateway';
import { Chat, GroupChat, Message, Muted, Banned } from './entities';
import { ChatService } from './services/chat.service';

let entities = [Chat, GroupChat, Message, Muted, Banned];

@Module({
  imports: [TypeOrmModule.forFeature(entities), AuthModule, UserModule],
  controllers: [],
  providers: [ChatService],
})
export class ChatModule {}
