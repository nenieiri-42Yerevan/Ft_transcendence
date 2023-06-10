import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PasswordDto } from '../dto/password.dto';
import { GroupChatDto } from '../dto/group-chat.dto';
import { GroupChat, Chat, Message, Banned, Muted } from '../entities';
import { ChatService } from '../services/chat.service';
import { GroupChatService } from '../services/group-chat.service';

@Controller('/chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly groupChatService: GroupChatService,
  ) {}

  @Get('user/:id')
  findAllForUser(@Param('id', ParseIntPipe) id: number): Promise<Chat[]> {
    return this.chatService.findAll(id);
  }

  @Get('/group')
  findAllGroups(): Promise<GroupChat[]> {
    return this.groupChatService.findAll();
  }

  @Get('/:id')
  findChatById(@Param('id', ParseIntPipe) id: number): Promise<Chat> {
    return this.chatService.findOne(id);
  }


  @Get('/group/:gid')
  findGroupById(@Param('gid', ParseIntPipe) gid: number): Promise<GroupChat> {
    return this.groupChatService.findOne(gid);
  }

  @Post('/create/:uid/:tid')
  createChat(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('tid', ParseIntPipe) tid: number,
  ): Promise<Chat> {
    return this.chatService.openChat(uid, tid);
  }

  @Post('/group/create/:uid')
  createGroupChat(
    @Param('uid', ParseIntPipe) uid: number,
    @Body() gchat: any,
  ): Promise<GroupChat> {
    return this.groupChatService.createGroupChat(gchat, uid);
  }

  @Post('/message/create/:cid/:uid')
  createChatMessage(
    @Param('cid', ParseIntPipe) cid: number,
    @Param('uid', ParseIntPipe) uid: number,
    @Body() text: string,
  ): Promise<Message> {
    return this.chatService.createMessage(cid, uid, text);
  }

  @Post('/group/update-pass/:gid/:uid')
  updatePassword(
    @Param('gid', ParseIntPipe) gid: number,
    @Param('uid', ParseIntPipe) uid: number,
    @Body() pass: any,
  ): Promise<void> {
    return this.groupChatService.updatePassword(pass, gid, uid);
  }

  @Post('/group/message/add/:gid/:uid')
  addMessage(
    @Param('gid', ParseIntPipe) gid: number,
    @Param('uid', ParseIntPipe) uid: number,
    @Body() text: string,
  ): Promise<void> {
    return this.groupChatService.addMessage(gid, text, uid);
  }

  @Post('/group/add/:uid')
  addUser(
    @Param('uid', ParseIntPipe) uid: number,
    @Body() gchat: any,
  ): Promise<void> {
    return this.groupChatService.addUser(gchat, uid);
  }

  @Delete('/group/delete/:uid/:gid')
  deleteUserFromGroup(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('gid', ParseIntPipe) gid: number,
  ): Promise<void> {
    return this.groupChatService.deleteUserFromGroup(uid, gid);
  }

  @Post('/group/bann/:uid/:gid/:adminId')
  bannUser(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('gid', ParseIntPipe) gid: number,
    @Param('adminId', ParseIntPipe) adminId: number,
  ): Promise<void> {
    return this.groupChatService.bannUser(uid, gid, adminId);
  }

  @Post('/group/unbann/')
  unbanUser(@Body() user: Banned, @Body() gchat: GroupChat): Promise<void> {
    return this.groupChatService.unbannUser(user, gchat);
  }

  @Post('/group/mute/:uid/:gid/:adminId')
  muteUser(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('gid', ParseIntPipe) gid: number,
    @Param('adminId', ParseIntPipe) adminId: number,
  ): Promise<void> {
    return this.groupChatService.muteUser(uid, gid, adminId);
  }

  @Post('/group/unmute/')
  unmuteUser(@Body() user: Muted, @Body() gchat: GroupChat): Promise<void> {
    return this.groupChatService.unmuteUser(user, gchat);
  }

  @Delete('/delete/:uid')
  delete(@Param('uid', ParseIntPipe) uid: number): Promise<void> {
    return this.groupChatService.delete(uid);
  }
}
