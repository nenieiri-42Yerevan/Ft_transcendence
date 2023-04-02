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
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let MatchService = class MatchService {
    constructor(matchRepo) {
        this.matchRepo = matchRepo;
    }
    async create(obj) {
        let match = this.matchRepo.create(Object.assign({ date: new Date() }, obj));
        try {
            this.matchRepo.save(match);
        }
        catch (error) {
            throw new common_1.HttpException(error.messgae, common_1.HttpStatus.BAD_REQUEST);
        }
        return match;
    }
    async update(id, newMatch) {
        if (!newMatch)
            throw new common_1.HttpException('Body is null', common_1.HttpStatus.NOT_FOUND);
        await this.matchRepo.findOne({ where: { id } });
        try {
            newMatch.id = id;
            await this.matchRepo.update(id, newMatch);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        delete newMatch.id;
        return newMatch;
    }
    async delete(id) {
        try {
            await this.matchRepo.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Match)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MatchService);
exports.MatchService = MatchService;
//# sourceMappingURL=match.service.js.map