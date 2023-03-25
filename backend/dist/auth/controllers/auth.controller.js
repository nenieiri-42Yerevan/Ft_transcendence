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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../../common/guards");
const auth_service_1 = require("../services/auth.service");
const dto_1 = require("../dto");
const decorators_1 = require("../../common/decorators");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signinLocal(dto) {
        return this.authService.signinLocal(dto);
    }
    signinTFA(dto) {
        return this.authService.signinTFA(dto);
    }
    logout(accessToken) {
        this.authService.logout(accessToken);
    }
    refreshTokens(userId, refreshToken) {
        this.authService.refreshTokens(userId, refreshToken);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('signin/local'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinLocal", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('signin/2FA'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignInTFADto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinTFA", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetUser)('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(guards_1.RtGuard),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetUserId)()),
    __param(1, (0, decorators_1.GetUser)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshTokens", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map