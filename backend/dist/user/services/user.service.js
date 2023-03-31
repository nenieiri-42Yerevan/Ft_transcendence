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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const argon = require("argon2");
const entities_1 = require("../entities/");
const avatar_service_1 = require("./avatar.service");
let UserService = class UserService {
    constructor(avatarService, userRepo, matchRepo) {
        this.avatarService = avatarService;
        this.userRepo = userRepo;
        this.matchRepo = matchRepo;
    }
    async create(dto) {
        let user = await this.userRepo.findOne({
            where: [{ username: dto.username }, { email: dto.email }],
        });
        if (user !== null) {
            if (user.username === dto.username)
                throw new common_1.HttpException(`userrname ${dto.username} is already occupied`, common_1.HttpStatus.BAD_REQUEST);
            else
                throw new common_1.HttpException(`email ${dto.email} is already occupied`, common_1.HttpStatus.BAD_REQUEST);
        }
        user = new entities_1.User();
        user.first_name = dto.first_name;
        user.last_name = dto.last_name;
        user.username = dto.username;
        user.email = dto.email;
        user.password = await argon.hash(dto.password);
        user.gender = dto.gender;
        user.date_of_birth = dto.date_of_birth;
        try {
            await this.userRepo.save(user);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    findAll() {
        return this.userRepo.find();
    }
    async findOne(property, relations = []) {
        let user = null;
        console.log("I'm trying to find someone...");
        if (property && typeof property == 'number') {
            console.log("I'm trying to find someone...");
            user = await this.userRepo.findOne({
                where: { id: property },
                relations,
            });
        }
        else {
            user = await this.userRepo.findOne({
                where: { username: property },
                relations,
            });
        }
        if (!user)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    async findAvatar(id) {
        const user = await this.findOne(id, ['avatar']);
        if (!user.avatar)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        return user.avatar;
    }
    async findMatches(id) {
        const user = await this.findOne(id, ['won', 'lost']);
        let matches = [];
        if (user.won)
            matches = matches.concat(user.won);
        if (user.lost)
            matches = matches.concat(user.lost);
        return matches;
    }
    async findFollows(id) {
        const follows = [];
        const user = await this.findOne(id);
        if (!user)
            throw new common_1.HttpException('User not found!', common_1.HttpStatus.NOT_FOUND);
        user.follows.forEach(async (id) => {
            let f = await this.findOne(id);
            follows.push(f);
        });
        return follows;
    }
    async findBlocked(id) {
        const blocked = [];
        const user = await this.findOne(id);
        if (!user)
            throw new common_1.HttpException('User not found!', common_1.HttpStatus.NOT_FOUND);
        user.blocked.forEach(async (id) => {
            let b = await this.findOne(id);
            blocked.push(b);
        });
        return blocked;
    }
    async update(id, newUser) {
        if (!newUser)
            throw new common_1.HttpException('Body is null', common_1.HttpStatus.NOT_FOUND);
        await this.findOne(id);
        const modifiable = ['first_name', 'last_name', 'username'];
        for (const key of Object.keys(newUser)) {
            if (modifiable.indexOf(key) == -1)
                throw new common_1.HttpException('Value cannot be modified', common_1.HttpStatus.FORBIDDEN);
        }
        if (newUser.username) {
            newUser.username = newUser.username.replace(/\s+/g, '');
            if (!newUser.username.length)
                throw new common_1.HttpException('Username cannot be empty', common_1.HttpStatus.FORBIDDEN);
        }
        try {
            newUser.id = id;
            await this.userRepo.update(id, newUser);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        delete newUser.id;
        return newUser;
    }
    async updateLevel(winner, loser) {
        try {
            await this.userRepo.update(winner.id, { rank: winner.rank + 1 });
            if (loser.rank > 0)
                await this.userRepo.update(loser.id, { rank: loser.rank - 1 });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async setStatus(id, status) {
        let user = await this.findOne(id);
        if (user.status == status)
            return;
        try {
            await this.userRepo.update(user.id, { status });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async setAvatar(id, file) {
        if (!file)
            throw new common_1.HttpException('File required', common_1.HttpStatus.NOT_ACCEPTABLE);
        const filename = file.originalname;
        const data = file.buffer;
        const user = await this.findOne(id, ['avatar']);
        await this.avatarService.create(filename, user, data);
        if (user.avatar)
            await this.avatarService.delete(user.avatar.id);
    }
    async toggleFollow(uid, tid) {
        if (uid === tid)
            return;
        const user = await this.findOne(uid);
        const target = await this.findOne(tid);
        let follows = user.follows;
        const index = follows.indexOf(target.id);
        if (index === -1)
            follows = [...follows, target.id];
        else
            follows = [...follows.slice(0, index), ...follows.slice(index + 1)];
        try {
            await this.userRepo.update(user.id, { follows: follows });
        }
        catch (error) {
            throw new Error(`Could not update user: ${error.message}`);
        }
        return follows;
    }
    async toggleBlock(uid, tid) {
        if (uid === tid)
            return;
        const user = await this.findOne(uid);
        const target = await this.findOne(tid);
        const index = user.blocked.indexOf(target.id);
        if (index === -1)
            user.blocked.push(target.id);
        else
            user.blocked.splice(index, 1);
        try {
            await this.userRepo.update(user.id, {
                blocked: user.blocked,
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return user.blocked;
    }
    async delete(id) {
        let user = await this.findOne(id);
        await this.userRepo.remove(user);
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Match)),
    __metadata("design:paramtypes", [avatar_service_1.AvatarService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map