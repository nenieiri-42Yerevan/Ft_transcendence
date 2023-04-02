"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const websockets_1 = require("@nestjs/websockets");
const argon = require("argon2");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../auth/services/auth.service");
const entities_1 = require("../user/entities");
const user_service_1 = require("../user/services/user.service");
const entities_2 = require("./entities");
const chat_service_1 = require("./services/chat.service");
const group_chat_service_1 = require("./services/group-chat.service");
let ChatGateway = class ChatGateway {
    constructor(authService, userService, groupChatService, chatService, configService) {
        this.authService = authService;
        this.userService = userService;
        this.groupChatService = groupChatService;
        this.chatService = chatService;
        this.configService = configService;
    }
    afterInit() {
        const origin = this.configService.get('FRONT_URL');
        Object.assign(this.server, { cors: { origin } });
    }
    async handleConnection(client) {
        try {
            const user = await this.authService.retrieveUser(client);
            if (!user)
                return client.disconnect();
            await this.userService.setStatus(user.id, entities_1.Status.CHAT);
            const userGroups = await this.groupChatService.findUserGroups(user.id);
            const userChats = await this.chatService.findAll(user.id);
            const groups = await this.groupChatService.findAll();
            client.data.user = user;
            client.emit('info', { user, userGroups, groups, userChats });
        }
        catch (_a) { }
    }
    handleDisconnect(client) {
        try {
            if (!client.data.user)
                return;
            return this.userService.setStatus(client.data.user.id, entities_1.Status.ONLINE);
        }
        catch (_a) { }
    }
    emitGroup(gchat, event, ...args) {
        try {
            if (!gchat.users)
                return;
            const sockets = Array.from(this.server.sockets.values());
            sockets.forEach((socket) => {
                if (gchat.users.find((user) => user.id == socket.data.user.id))
                    socket.emit(event, ...args);
            });
        }
        catch (_a) { }
    }
    async getGroup(client, id) {
        try {
            const gchat = await this.groupChatService.findOne(id, [
                'users',
                'messages',
                'muted',
                'banned',
            ]);
            client.emit('group-chat', gchat);
        }
        catch (_a) { }
    }
    async getUserChats(client) {
        try {
            const chats = await this.groupChatService.findUserGroups(client.data.user.id);
            client.emit('my-chats', chats);
        }
        catch (_a) { }
    }
    async handleMessage(client, data) {
        try {
            const user = client.data.user;
            const gchat = await this.groupChatService.findOne(data.id, ['users']);
            if (data.value.length >= 1 << 8)
                throw new common_1.HttpException('text is too long', common_1.HttpStatus.BAD_REQUEST);
            await this.groupChatService.addMessage(data.id, data.value, user.id);
            this.emitGroup(gchat, 'text', Object.assign({ user: { id: user.id, username: user.username } }, data));
        }
        catch (_a) { }
    }
    async joinGroup(client, partialGroup) {
        try {
            let gchat = await this.groupChatService.findOne(partialGroup.id, [], true);
            if (!gchat.public && partialGroup.password)
                client.emit('passwordValide', argon.verify(partialGroup.password, gchat.password));
            await this.groupChatService.addUser(partialGroup, client.data.user.id);
            gchat = await this.groupChatService.findOne(gchat.id, ['users']);
            this.emitGroup(gchat, 'join', { gchat, user: client.data.user });
        }
        catch (_a) { }
    }
    async leaveChannel(client, data) {
        try {
            let user = client.data.user;
            if (data.userId)
                user = await this.userService.findOne(data.userId);
            const gchat = await this.groupChatService.findOne(data.channelId, [
                'users',
            ]);
            await this.groupChatService.deleteUserFromGroup(user.id, data.channelId, client.data.user.id);
            const is_delete = gchat.owner.id == user.id ? true : false;
            this.emitGroup(gchat, 'leave', {
                gchat,
                user,
                is_delete: is_delete,
            });
        }
        catch (_a) { }
    }
    async toggleBan(client, data) {
        try {
            const gchat = await this.groupChatService.findOne(data.channelId, [
                'users',
                'banned',
            ]);
            const curuser = await this.userService.findOne(data.userId);
            const admin = client.data.user;
            const banned = gchat.banned.find((banned) => banned.user.id == data.user.id);
            if (banned)
                await this.groupChatService.unbannUser(banned, gchat);
            else
                await this.groupChatService.bannUser(curuser.id, gchat.id, admin.id);
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
        }
        catch (_a) { }
    }
    async toggleMute(client, data) {
        try {
            let gchat = await this.groupChatService.findOne(data.channelId, [
                'users',
                'muted',
            ]);
            const curuser = await this.userService.findOne(data.userId);
            const admin = client.data.user;
            const muted = gchat.muted.find((muted) => muted.user.id == data.userId);
            if (muted)
                await this.groupChatService.unmuteUser(muted, gchat);
            else
                await this.groupChatService.muteUser(curuser.id, gchat.id, admin.id);
            gchat = await this.groupChatService.findOne(data.channelId, [
                'users',
                'muted',
            ]);
            this.emitGroup(gchat, 'mute', {
                channel: { id: gchat.id, name: gchat.name, muted: gchat.muted },
                user: { id: admin.id, username: admin.username },
                muted_user: { id: curuser.id, username: curuser.username },
            });
        }
        catch (_a) { }
    }
    async getChat(client, channelid) {
        try {
            const chat = await this.chatService.findOne(channelid, [
                'messages',
                'users',
            ]);
            client.emit('chat', chat);
        }
        catch (_a) { }
    }
    async GetUserChats(client) {
        try {
            const chats = await this.chatService.findAll(client.data.user.id);
            client.emit('my-chats', chats);
        }
        catch (_a) { }
    }
    async joinChat(client, userId) {
        try {
            const chat = await this.chatService.openChat(client.data.user.id, userId);
            this.emitGroup(chat, 'join-chat');
        }
        catch (_a) { }
    }
    async sendMessageDM(client, data) {
        try {
            const chat = await this.chatService.findOne(data.channelId, ['users']);
            const other = chat.users.find((user) => user.id != client.data.user.id);
            if (other && other.blocked.includes(client.data.user.id))
                client.emit('blocked');
            if (data.text.length >= 1 << 8)
                throw new common_1.HttpException('text is too long', common_1.HttpStatus.BAD_REQUEST);
            const message = await this.chatService.createMessage(chat.id, client.data.user.id, data.text);
            this.emitGroup(chat, 'textDM', {
                user: message.author,
                text: message.content,
                channelId: chat.id,
            });
        }
        catch (_a) { }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('group-chat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getGroup", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('my-chats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getUserChats", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('text'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, entities_2.GroupChat]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "joinGroup", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "leaveChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('ban'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "toggleBan", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('mute'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "toggleMute", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('chat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('my-chats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "GetUserChats", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-chat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "joinChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('textDM'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "sendMessageDM", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '' },
        namespace: 'chat',
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        group_chat_service_1.GroupChatService,
        chat_service_1.ChatService,
        config_1.ConfigService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map