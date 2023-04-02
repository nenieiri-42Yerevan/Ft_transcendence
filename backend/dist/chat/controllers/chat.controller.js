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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const password_dto_1 = require("../dto/password.dto");
const entities_1 = require("../entities");
const chat_service_1 = require("../services/chat.service");
const group_chat_service_1 = require("../services/group-chat.service");
let ChatController = class ChatController {
    constructor(chatService, groupChatService) {
        this.chatService = chatService;
        this.groupChatService = groupChatService;
    }
    findAllForUser(uid) {
        return this.chatService.findAll(uid);
    }
    findChatById(id) {
        return this.chatService.findOne(id);
    }
    findAllGroups() {
        return this.groupChatService.findAll();
    }
    findGroupById(gid) {
        return this.groupChatService.findOne(gid);
    }
    createChat(uid, tid) {
        return this.chatService.openChat(uid, tid);
    }
    createGroupChat(uid, gchat) {
        return this.groupChatService.createGroupChat(gchat, uid);
    }
    createChatMessage(cid, uid, text) {
        return this.chatService.createMessage(cid, uid, text);
    }
    updatePassword(gid, uid, pass) {
        return this.groupChatService.updatePassword(pass, gid, uid);
    }
    addMessage(gid, uid, text) {
        return this.groupChatService.addMessage(gid, text, uid);
    }
    addUser(uid, gchat) {
        return this.groupChatService.addUser(gchat, uid);
    }
    deleteUserFromGroup(uid, gid) {
        return this.groupChatService.deleteUserFromGroup(uid, gid);
    }
    bannUser(uid, gid, adminId) {
        return this.groupChatService.bannUser(uid, gid, adminId);
    }
    unbanUser(user, gchat) {
        return this.groupChatService.unbannUser(user, gchat);
    }
    muteUser(uid, gid, adminId) {
        return this.groupChatService.muteUser(uid, gid, adminId);
    }
    unmuteUser(user, gchat) {
        return this.groupChatService.unmuteUser(user, gchat);
    }
    delete(uid) {
        return this.groupChatService.delete(uid);
    }
};
__decorate([
    (0, common_1.Get)('/:uid'),
    __param(0, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "findAllForUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "findChatById", null);
__decorate([
    (0, common_1.Get)('/group/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "findAllGroups", null);
__decorate([
    (0, common_1.Get)('/group/:gid'),
    __param(0, (0, common_1.Param)('gid', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "findGroupById", null);
__decorate([
    (0, common_1.Post)('/create/:uid/:tid'),
    __param(0, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tid', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createChat", null);
__decorate([
    (0, common_1.Post)('/group/create/:uid'),
    __param(0, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entities_1.GroupChat]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createGroupChat", null);
__decorate([
    (0, common_1.Post)('/message/create/:cid/:uid'),
    __param(0, (0, common_1.Param)('cid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createChatMessage", null);
__decorate([
    (0, common_1.Post)('/group/update-pass/:gid/:uid'),
    __param(0, (0, common_1.Param)('gid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, password_dto_1.PasswordDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('/group/message/add/:gid/:uid'),
    __param(0, (0, common_1.Param)('gid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "addMessage", null);
__decorate([
    (0, common_1.Post)('/group/add/:uid'),
    __param(0, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entities_1.GroupChat]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "addUser", null);
__decorate([
    (0, common_1.Delete)('/group/delete/:uid/:gid/'),
    __param(0, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('gid', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteUserFromGroup", null);
__decorate([
    (0, common_1.Post)('/group/bann/:uid/:gid/:adminId'),
    __param(0, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('gid', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('adminId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "bannUser", null);
__decorate([
    (0, common_1.Post)('/group/unbann/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Banned, entities_1.GroupChat]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "unbanUser", null);
__decorate([
    (0, common_1.Post)('/group/mute/:uid/:gid/:adminId'),
    __param(0, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('gid', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('adminId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "muteUser", null);
__decorate([
    (0, common_1.Post)('/group/unmute/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Muted, entities_1.GroupChat]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "unmuteUser", null);
__decorate([
    (0, common_1.Delete)('/delete/:uid'),
    __param(0, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "delete", null);
ChatController = __decorate([
    (0, common_1.Controller)('/chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        group_chat_service_1.GroupChatService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map