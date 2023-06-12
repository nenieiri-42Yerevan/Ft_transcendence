/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { Status } from 'src/user/entities';
import { UserService } from 'src/user/services/user.service';
import { GroupChat } from './entities';
import { ChatService } from './services/chat.service';
import { GroupChatService } from './services/group-chat.service';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'chat',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
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

      // await this.userService.setStatus(user.id, Status.CHAT);

      const userGroups = await this.groupChatService.findUserGroups(user.id);
      const userChats = await this.chatService.findAll(user.id);

      const groups = await this.groupChatService.findAll();

      client.data.user = user;

      client.emit('info', { user, userGroups, groups, userChats });
    } catch(error) {
      console.log(error);
    }
  }

  handleDisconnect(client: Socket): Promise<any> {
    try {
      if (!client.data.user) return;

      // return this.userService.setStatus(client.data.user.id, Status.ONLINE);
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
      console.log(data);
    try {
      const user = client.data.user;
      const gchat = await this.groupChatService.findOne(data.id, ['users']);

      if (data.value.length >= 1 << 8)
        throw new WsException('Text is too long');

      console.log("Group Found");
      await this.groupChatService.addMessage(data.id, data.value, user.id);
      console.log("Message received!");
      this.emitGroup(gchat, 'text', {
        user: { id: user.id, username: user.username },
        ...data,
      });
    } catch {}
  }

  @SubscribeMessage('join')
  async joinGroup(client: Socket, partialGroup: GroupChat): Promise<void> {
    try {
        console.log(partialGroup);
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

  @SubscribeMessage('admin')
  async toggleAdmin(client: Socket, data: any): Promise<void> {
    try {
      let gchat = await this.groupChatService.findOne(data.gid, ['users']);
      const owner = client.data.user;
      const admin = await this.userService.findOne(data.userId);

      await this.groupChatService.toggleAdmin(owner.id, admin.id, gchat.id);

      gchat = await this.groupChatService.findOne(data.gid, ['users']);

      this.emitGroup(gchat, 'admin', {
        gchat: { id: gchat.id, name: gchat.name, admin: gchat.admins },
        admin_user: { id: admin.id, username: admin.username },
      });
    } catch {}
  }

  @SubscribeMessage('ban')
  async toggleBan(client: Socket, data: any): Promise<void> {
    try {
      const gchat = await this.groupChatService.findOne(data.channelId, [
        'users',
        'banned',
      ]);
      const curuser = await this.userService.findOne(data.userId);
      const admin = client.data.user;

      const banned = gchat.banned.find(
        (banned) => banned.user.id == data.user.id,

      );

      if (banned) await this.groupChatService.unbannUser(banned, gchat);
      else await this.groupChatService.bannUser(curuser.id, gchat.id, admin.id);

      const new_channel = await this.groupChatService.findOne(data.channelId, [
        'banned',
      ]);

      this.emitGroup(gchat, 'ban', {
        channel: {
          id: gchat.id,
          name: gchat.name,
          banned: new_channel.banned,
        },
        user: { id: admin.id, username: admin.username },
        banned_user: { id: curuser.id, username: curuser.username },
      });
    } catch {}
  }

  @SubscribeMessage('mute')
  async toggleMute(client: Socket, data: any): Promise<void> {
    try {
      let gchat = await this.groupChatService.findOne(data.channelId, [
        'users',
        'muted',
      ]);
      const curuser = await this.userService.findOne(data.userId);
      const admin = client.data.user;

      const muted = gchat.muted.find((muted) => muted.user.id == data.userId);

      if (muted) await this.groupChatService.unmuteUser(muted, gchat);
      else await this.groupChatService.muteUser(curuser.id, gchat.id, admin.id);

      gchat = await this.groupChatService.findOne(data.channelId, [
        'users',
        'muted',
      ]);

      this.emitGroup(gchat, 'mute', {
        channel: { id: gchat.id, name: gchat.name, muted: gchat.muted },
        user: { id: admin.id, username: admin.username },
        muted_user: { id: curuser.id, username: curuser.username },
      });
    } catch {}
  }

  /* DIRECT MESSAGE:D ---------------------------------------------------------------------- */

  @SubscribeMessage('chat')
  async getChat(client: Socket, channelid: number): Promise<void> {
    try {
      const chat = await this.chatService.findOne(channelid, [
        'messages',
        'users',
      ]);
      client.emit('chat', chat);
    } catch {}
  }

  @SubscribeMessage('my-chats')
  async GetUserChats(client: Socket): Promise<void> {
    try {
      console.log("my-chats");
      const chats = await this.chatService.findAll(client.data.user.id);
      client.emit('my-chats', chats);
    } catch {}
  }

  @SubscribeMessage('join-chat')
  async joinChat(client: Socket, userId: number): Promise<void> {
    try {
      console.log("hh");
      const chat = await this.chatService.openChat(client.data.user.id, userId);
      this.emitGroup(chat, 'join-chat', chat.id);
    } catch(error) {
      console.log(error);
    }
  }

  @SubscribeMessage('textDM')
  async sendMessageDM(client: Socket, data: any): Promise<void> {
    try {
      const chat = await this.chatService.findOne(data.channelId, ['users']);
      const other = chat.users.find((user) => user.id != client.data.user.id);

      // if (other && other.blocked.includes(client.data.user.id))
      //   client.emit('blocked');

      if (data.text.length >= 1 << 8) throw new WsException('Text is too long');

      const message = await this.chatService.createMessage(
        chat.id,
        client.data.user.id,
        data.text,
      );
      this.emitGroup(chat, 'textDM', {
        user: message.author,
        text: message.content,
        channelId: chat.id,
      });
    } catch(error) {console.log(error)}
  }
}
