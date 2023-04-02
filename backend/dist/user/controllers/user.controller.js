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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../dto");
const entities_1 = require("../entities");
const avatar_service_1 = require("../services/avatar.service");
const user_service_1 = require("../services/user.service");
const decorators_1 = require("../../common/decorators");
const platform_express_1 = require("@nestjs/platform-express");
const session_service_1 = require("../services/session.service");
let UserController = class UserController {
    constructor(userService, sessionService, avatarService) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.avatarService = avatarService;
    }
    findAll() {
        console.log('mmm');
        return this.userService.findAll();
    }
    findBySession(rtoken) {
        console.log('vvv');
        return this.sessionService.findOneBytoken(rtoken);
    }
    findByUsername(username) {
        console.log('bbb');
        return this.userService.findOne(username);
    }
    findById(id) {
        return this.userService.findOne(id);
    }
    async findAvatar(id, res) {
        const avatar = await this.userService.findAvatar(id);
        res.set({
            'Content-Disposition': `inline; filename="${avatar.file}"`,
            'Content-Type': 'image/*',
        });
        return this.avatarService.toStreamableFile(avatar.data);
    }
    findMatches(id) {
        return this.userService.findMatches(id);
    }
    findFollows(id) {
        return this.userService.findFollows(id);
    }
    findBlocked(id) {
        return this.userService.findBlocked(id);
    }
    async updateUser(id, user) {
        const current = await this.userService.findOne(id);
        return this.userService.update(current.id, user);
    }
    updateAvatar(id, file) {
        return this.userService.setAvatar(id, file);
    }
    toggleUserFollowed(uid, tid) {
        return this.userService.toggleFollow(uid, tid);
    }
    toggleUserBlocked(uid, tid) {
        return this.userService.toggleBlock(uid, tid);
    }
    async create(dto) {
        return await this.userService.create(dto);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/by-token/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findBySession", null);
__decorate([
    (0, common_1.Get)('/by-name/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByUsername", null);
__decorate([
    (0, common_1.Get)('/by-id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('/:id/avatar'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAvatar", null);
__decorate([
    (0, common_1.Get)('/:id/matches'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMatches", null);
__decorate([
    (0, common_1.Get)('/:id/follows'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findFollows", null);
__decorate([
    (0, common_1.Get)('/:id/blocked'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findBlocked", null);
__decorate([
    (0, common_1.Put)('/update-user/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entities_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)('/update-avatar/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Put)('/follow/:uid/:tid'),
    __param(0, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tid', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleUserFollowed", null);
__decorate([
    (0, common_1.Put)('/block/:uid/:tid'),
    __param(0, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tid', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleUserBlocked", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
UserController = __decorate([
    (0, common_1.Controller)('/user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        session_service_1.SessionService,
        avatar_service_1.AvatarService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map