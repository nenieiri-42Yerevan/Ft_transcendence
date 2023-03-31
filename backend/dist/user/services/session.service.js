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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let SessionService = class SessionService {
    constructor(sessionRepo) {
        this.sessionRepo = sessionRepo;
    }
    async create(access_token, refresh_token, owner) {
        let session = this.sessionRepo.create({
            access_token,
            refresh_token,
            owner,
        });
        try {
            await this.sessionRepo.save(session);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return session;
    }
    async findOneBytoken(rtoken) {
        let session = null;
        if (!rtoken)
            throw new common_1.HttpException('Invalid token provided!', common_1.HttpStatus.BAD_REQUEST);
        try {
            session = await this.sessionRepo.findOne({
                where: { refresh_token: rtoken },
                relations: ['owner'],
            });
        }
        catch (error) {
            throw new common_1.HttpException('Session not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return session.owner;
    }
    async read_AT(access_token) {
        let session = null;
        if (access_token)
            session = await this.sessionRepo.findOne({ where: { access_token } });
        if (!session)
            throw new common_1.HttpException('Session not found', common_1.HttpStatus.NOT_FOUND);
        return session;
    }
    async read_RT(refresh_token) {
        let session = null;
        console.log;
        if (refresh_token)
            session = await this.sessionRepo.findOne({ where: { refresh_token } });
        if (!session)
            throw new common_1.HttpException('Session not found', common_1.HttpStatus.NOT_FOUND);
        return session;
    }
    async update(id, session) {
        if (!session)
            throw new common_1.HttpException('Body is null', common_1.HttpStatus.NOT_FOUND);
        try {
            session.id = id;
            await this.sessionRepo.update(id, session);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        delete session.id;
        return session;
    }
    async delete(id) {
        try {
            await this.sessionRepo.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Session)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map