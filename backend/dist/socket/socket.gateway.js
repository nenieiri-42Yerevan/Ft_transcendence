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
exports.SocketGateway = void 0;
const config_1 = require("@nestjs/config");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../auth/services/auth.service");
const entities_1 = require("../user/entities");
const user_service_1 = require("../user/services/user.service");
const socket_service_1 = require("./socket.service");
let SocketGateway = class SocketGateway {
    constructor(configService, socketService, authService, userService) {
        this.configService = configService;
        this.socketService = socketService;
        this.authService = authService;
        this.userService = userService;
    }
    afterInit(srv) {
        this.socketService.server = srv;
        const origin = this.configService.get('FRONT_URL');
        Object.assign(this.server, { cors: { origin } });
    }
    async onConnect(client) {
        try {
            const user = await this.authService.retrieveUser(client);
            if (!user)
                client.disconnect();
            await this.userService.setStatus(user.id, entities_1.Status.ONLINE);
        }
        catch (_a) { }
    }
    onDisconnect(client) {
        try {
            if (!client.data.user)
                return;
            const uid = client.data.user.id;
            setTimeout(async () => {
                const socket = Array.from(this.server.sockets.values()).find((socket) => socket.data.user.id == uid);
                if (socket)
                    return;
                const user = await this.userService.findOne(uid);
                if (!user)
                    return;
                if (user.status == entities_1.Status.ONLINE)
                    await this.userService.setStatus(uid, entities_1.Status.OFFLINE);
            }, 5 * 1000);
        }
        catch (_a) { }
    }
    onMessage(client, data) {
        try {
            const user = client.data.user;
            if (!user)
                return;
            const socket = Array.from(this.server.sockets.values()).find((socket) => socket.data.user.id == data.id);
            if (!socket)
                client.emit('error', 'User not found!');
            else {
                data.id = user.id;
                socket.emit('message', data);
            }
        }
        catch (_a) { }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], SocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "onMessage", null);
SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '' },
        namespace: 'gateway',
    }),
    __metadata("design:paramtypes", [config_1.ConfigService,
        socket_service_1.SocketService,
        auth_service_1.AuthService,
        user_service_1.UserService])
], SocketGateway);
exports.SocketGateway = SocketGateway;
//# sourceMappingURL=socket.gateway.js.map