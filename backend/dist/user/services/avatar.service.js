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
exports.AvatarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const PlatformTools_1 = require("typeorm/platform/PlatformTools");
const entities_1 = require("../entities");
let AvatarService = class AvatarService {
    constructor(avatarRepo) {
        this.avatarRepo = avatarRepo;
    }
    async create(file, user, data) {
        let avatar = this.avatarRepo.create({ file, user, data });
        try {
            await this.avatarRepo.save(avatar);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return avatar;
    }
    async update(id, newAvatar) {
        if (!newAvatar)
            throw new common_1.HttpException('Body is null', common_1.HttpStatus.NOT_FOUND);
        await this.avatarRepo.findOne({ where: { id } });
        try {
            newAvatar.id = id;
            await this.avatarRepo.update(id, newAvatar);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        delete newAvatar.id;
        return newAvatar;
    }
    toStreamableFile(data) {
        return new common_1.StreamableFile(PlatformTools_1.Readable.from(data));
    }
    async delete(id) {
        try {
            await this.avatarRepo.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
AvatarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Avatar)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AvatarService);
exports.AvatarService = AvatarService;
//# sourceMappingURL=avatar.service.js.map