import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from 'src/user/entities';
import { PasswordDto } from '../dto/password.dto';
import { GroupChat, Chat } from '../entities';
import { ChatService } from '../services/chat.service';
import { GroupChatService } from '../services/group-chat.service';

@Controller('/chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly groupChatService: GroupChatService,
  ) {}

  @Get('/:id')
  findAll(@Param('id', ParseIntPipe) uid: number): Promise<Chat[]> {
    return this.chatService.findAll(uid);
  }

  @Get('/group/')
  findAllGroups(): Promise<GroupChat[]> {
    return this.groupChatService.findAll();
  }

  @Post('/create/:id')
  createChat(@Body() users: User[]): Promise<Chat> {
    return this.chatService.createChat(users);
  }

  @Post('/group/create/:id')
  createGroupChat(
    @Param('id', ParseIntPipe) uid: number,
    @Body() gchat: GroupChat,
  ): Promise<GroupChat> {
    return this.groupChatService.createGroupChat(gchat, uid);
  }

  @Post('/group/update/:gid/:uid')
  changePass(
    @Param('gid', ParseIntPipe) gid: number,
    @Param('uid', ParseIntPipe) uid: number,
    @Body() pass: PasswordDto,
  ): Promise<void> {
    return this.groupChatService.updatePassword(pass, gid, uid);
  }
}
