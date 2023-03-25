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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../../user/services/user.service");
const session_service_1 = require("../../user/services/session.service");
const argon = require("argon2");
const config_1 = require("@nestjs/config");
const speakeasy_1 = require("speakeasy");
let AuthService = class AuthService {
    constructor(userService, sessionService, jwtService, configService) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signinLocal(dto) {
        const user = await this.userService.findOne(dto.username);
        if (user && (await argon.verify(user.password, dto.password))) {
            const tokens = await this.generateJWT(user.id, user.username);
            const new_session = await this.sessionService.create(tokens.access_token, tokens.refresh_token, user);
            if (user.TFA_enabled == true)
                throw new common_1.HttpException(user.username, common_1.HttpStatus.FORBIDDEN);
            return tokens;
        }
        else
            throw new common_1.HttpException('Wrong password', common_1.HttpStatus.NOT_FOUND);
    }
    async signinTFA(dto) {
        const user = await this.userService.findOne(dto.username);
        const verified = speakeasy_1.speakeasy.totp.verify({
            secret: user.TFA_secret,
            encoding: 'base32',
            token: dto.TFA,
            window: 1
        });
        if (!verified)
            throw new common_1.HttpException('Wrong TFA', common_1.HttpStatus.NOT_FOUND);
        const tokens = await this.generateJWT(user.id, user.username);
        const new_session = await this.sessionService.create(tokens.access_token, tokens.refresh_token, user);
        return tokens;
    }
    async logout(at) {
        const session = await this.sessionService.read_AT(at);
        await this.sessionService.delete(session['id']);
    }
    async refreshTokens(userId, rt) {
        const user = await this.userService.findOne(userId, ['sessions']);
        if (user) {
            const session = await this.sessionService.read_RT(rt);
            const tokens = await this.generateJWT(user.id, user.username);
            this.sessionService.update(session.id, {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
            });
        }
        else
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
    }
    async generateJWT(userId, username) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                username: username,
            }, {
                secret: this.configService.get('AT_TOKEN'),
                expiresIn: 60 * 15,
            }),
            this.jwtService.signAsync({
                sub: userId,
                username: username,
            }, {
                secret: this.configService.get('RT_TOKEN'),
                expiresIn: 60 * 60 * 24 * 7,
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    verifyJWT(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (_a) {
            return null;
        }
    }
    async retrieveUser(client) {
        const authorization = client.handshake.headers.authorization;
        const token = authorization && authorization.split(' ')[1];
        if (!token)
            return null;
        const payload = this.verifyJWT(token);
        if (!payload)
            return null;
        const user = await this.userService.findOne(payload.sub).catch(() => null);
        if (!user)
            return null;
        return user;
    }
    async enableTFA(userId) {
        const user = await this.userService.findOne(userId);
        try {
            const secret = speakeasy_1.speakeasy.generateSecret().base32;
            user.TFA_secret = secret;
            return secret;
        }
        catch (error) {
            throw new common_1.HttpException('Error when generating the 2FA secret', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async disableTFA(userId) {
        const user = await this.userService.findOne(userId);
        user.TFA_secret = null;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        session_service_1.SessionService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map