/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ConfigService } from '@nestjs/config';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { Status } from 'src/user/entities';
import { UserService } from 'src/user/services/user.service';
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
}
