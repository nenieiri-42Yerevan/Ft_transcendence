import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from './chat.gateway';
import {
  Chat,
  GroupChat,
  Message,
  Muted,
  Banned,
  GroupMessage,
} from './entities';
import { ChatService } from './services/chat.service';
import { GroupChatService } from './services/group-chat.service';
import { ChatController } from './controllers/chat.controller';

let entities = [Chat, GroupChat, Message, GroupMessage, Muted, Banned];

@Module({
  imports: [TypeOrmModule.forFeature(entities), AuthModule, UserModule],
  controllers: [ChatController],
  providers: [ChatService, GroupChatService, ChatGateway],
})
export class ChatModule {}
