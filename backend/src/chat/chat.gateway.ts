/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as argon from 'argon2';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { Status } from 'src/user/entities';
import { UserService } from 'src/user/services/user.service';
import { GroupChat } from './entities';
import { ChatService } from './services/chat.service';
import { GroupChatService } from './services/group-chat.service';

@WebSocketGateway({
  cors: { origin: '' },
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly groupChatService: GroupChatService,
    private readonly chatService: ChatService,
    private readonly configService: ConfigService,
  ) {}

  @WebSocketServer()
  server: any;

  afterInit(): void {
    const origin = this.configService.get<string>('FRONT_URL');
    Object.assign(this.server, { cors: { origin } });
  }

  /* Handle Connect/Disconnect */

  async handleConnection(client: Socket): Promise<any> {
    try {
      const user = await this.authService.retrieveUser(client);
      if (!user) return client.disconnect();

      await this.userService.setStatus(user.id, Status.CHAT);

      const userGroups = await this.groupChatService.findUserGroups(user.id);
      const userChats = await this.chatService.findAll(user.id);

      const groups = await this.groupChatService.findAll();

      client.data.user = user;

      client.emit('info', { user, userGroups, groups, userChats });
    } catch {}
  }

  handleDisconnect(client: Socket): Promise<any> {
    try {
      if (!client.data.user) return;

      return this.userService.setStatus(client.data.user.id, Status.ONLINE);
    } catch {}
  }

  emitGroup(gchat: any, event: string, ...args: any): void {
    try {
      if (!gchat.users) return;

      const sockets: any[] = Array.from(this.server.sockets.values());
      sockets.forEach((socket) => {
        if (gchat.users.find((user) => user.id == socket.data.user.id))
          socket.emit(event, ...args);
      });
    } catch {}
  }

  @SubscribeMessage('group-chat')
  async getGroup(client: Socket, id: number): Promise<void> {
    try {
      const gchat = await this.groupChatService.findOne(id, [
        'users',
        'messages',
        'muted',
        'banned',
      ]);
      client.emit('group-chat', gchat);
    } catch {}
  }

  @SubscribeMessage('my-chats')
  async getUserChats(client: Socket): Promise<void> {
    try {
      const chats = await this.groupChatService.findUserGroups(
        client.data.user.id,
      );

      client.emit('my-chats', chats);
    } catch {}
  }

  @SubscribeMessage('text')
  async handleMessage(client: Socket, data: any): Promise<void> {
    try {
      const user = client.data.user;
      const gchat = await this.groupChatService.findOne(data.id, ['users']);

      if (data.value.length >= 1 << 8)
        throw new HttpException('text is too long', HttpStatus.BAD_REQUEST);

      await this.groupChatService.addMessage(data.id, data.value, user.id);
      this.emitGroup(gchat, 'text', {
        user: { id: user.id, username: user.username },
        ...data,
      });
    } catch {}
  }

  @SubscribeMessage('join')
  async joinGroup(client: Socket, partialGroup: GroupChat): Promise<void> {
    try {
      let gchat = await this.groupChatService.findOne(
        partialGroup.id,
        [],
        true,
      );
      if (!gchat.public && partialGroup.password)
        client.emit(
          'passwordValide',
          argon.verify(partialGroup.password, gchat.password),
        );

      await this.groupChatService.addUser(partialGroup, client.data.user.id);

      gchat = await this.groupChatService.findOne(gchat.id, ['users']);
      this.emitGroup(gchat, 'join', { gchat, user: client.data.user });
    } catch {}
  }

  @SubscribeMessage('leave')
  async leaveChannel(client: Socket, data: any): Promise<void> {
    try {
      let user = client.data.user;
      if (data.userId) user = await this.userService.findOne(data.userId);

      const gchat = await this.groupChatService.findOne(data.channelId, [
        'users',
      ]);
      await this.groupChatService.deleteUserFromGroup(
        user.id,
        data.channelId,
        client.data.user.id,
      );

      const is_delete = gchat.owner.id == user.id ? true : false;
      this.emitGroup(gchat, 'leave', {
        gchat,
        user,
        is_delete: is_delete,
      });
    } catch {}
  }
}
