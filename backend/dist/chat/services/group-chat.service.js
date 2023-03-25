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
exports.GroupChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("../../user/services/user.service");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const argon = require("argon2");
const temporary = 30 * 60 * 1000;
let GroupChatService = class GroupChatService {
    constructor(userService, groupChatRepo, messageRepo, mutedUserRepo, bannedUserRepo, logRepository) {
        this.userService = userService;
        this.groupChatRepo = groupChatRepo;
        this.messageRepo = messageRepo;
        this.mutedUserRepo = mutedUserRepo;
        this.bannedUserRepo = bannedUserRepo;
        this.logRepository = logRepository;
    }
    async createGroupChat(gchat, uid) {
        const admin = await this.userService.findOne(uid);
        let hash = null;
        gchat.name = gchat.name.replace(/\s+/g, '');
        if (gchat.name == undefined)
            throw new common_1.HttpException('Group Chat must have a name!', common_1.HttpStatus.FORBIDDEN);
        if (gchat.public == false) {
            if (!gchat.password)
                throw new common_1.HttpException('Password required!', common_1.HttpStatus.FORBIDDEN);
            if (gchat.password.length > 16)
                throw new common_1.HttpException('Password is too long!', common_1.HttpStatus.FORBIDDEN);
            try {
                hash = argon.hash(gchat.password);
            }
            catch (error) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        let exists = await this.groupChatRepo.findOne({
            where: { name: gchat.name },
        });
        if (exists)
            throw new common_1.HttpException('Group Chat already exists', common_1.HttpStatus.FORBIDDEN);
        const chat = this.groupChatRepo.create({
            name: gchat.name,
            public: gchat.public !== false,
            password: hash,
            owner: admin,
            admins: [admin.id],
            users: [admin],
        });
        try {
            await this.groupChatRepo.save(chat);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        delete chat.password;
        return chat;
    }
    async findOne(groupId, relations = [], needPass) {
        let gchat = null;
        if (groupId)
            gchat = await this.groupChatRepo.findOne({
                where: { id: groupId },
                relations,
            });
        if (!gchat)
            throw new common_1.HttpException('Group Chat not found', common_1.HttpStatus.NOT_FOUND);
        if (!needPass)
            delete gchat.password;
        return gchat;
    }
    async findAll() {
        const gchats = await this.groupChatRepo.find();
        gchats.forEach((chat) => delete chat.password);
        return gchats;
    }
    async findUserGroups(uid) {
        const uncompleted = await this.groupChatRepo
            .createQueryBuilder('gchat')
            .innerJoin('gchat.users', 'user')
            .where('user.id = :uid', { uid })
            .getMany();
        const unresolved = uncompleted.map((gchat) => this.findOne(gchat.id, ['users', 'muted', 'banned', 'messages']));
        return await Promise.all(unresolved);
    }
    async updatePassword(pass, gid, uid) {
        if (pass.newPassword.length > 16)
            throw new common_1.HttpException('New password is too long', common_1.HttpStatus.FORBIDDEN);
        const user = await this.userService.findOne(uid);
        const gchat = await this.findOne(gid);
        if (gchat.public == true)
            throw new common_1.HttpException('Group Chat is public', common_1.HttpStatus.FORBIDDEN);
        if (gchat.owner.id != user.id)
            throw new common_1.HttpException('User does not have premission', common_1.HttpStatus.FORBIDDEN);
        if (!pass.newPassword)
            throw new common_1.HttpException('New password cannot be empty', common_1.HttpStatus.FORBIDDEN);
        if (!(await this.checkPassword(gchat.id, pass.oldPassword)))
            throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.FORBIDDEN);
        try {
            const password = await argon.hash(pass.newPassword);
            await this.groupChatRepo.update(gchat.id, { password });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addUser(gchat, uid) {
        const user = await this.userService.findOne(uid);
        const chat = await this.findOne(gchat.id, ['users', 'banned'], true);
        if (!chat.public) {
            let valid = true;
            if (chat.password)
                valid = await argon.verify(gchat.password, chat.password);
            if (!valid)
                throw new common_1.HttpException('Incorrect password', common_1.HttpStatus.FORBIDDEN);
        }
        for (const banned of chat.banned) {
            if (banned.user.id == user.id) {
                const time = new Date();
                if (banned.endOfBan > time)
                    throw new common_1.HttpException('User is banned!', common_1.HttpStatus.FORBIDDEN);
                await this.unbannUser(banned, chat);
            }
        }
        if (chat.users.find((user1) => user1.id == user.id))
            throw new common_1.HttpException('User is already in group!', common_1.HttpStatus.CONFLICT);
        await this.groupChatRepo
            .createQueryBuilder()
            .relation(entities_1.GroupChat, 'users')
            .of(chat)
            .add(user);
    }
    async bannUser(uid, gchatId, adminId) {
        const admin = await this.userService.findOne(adminId);
        const user = await this.userService.findOne(uid);
        const chat = await this.findOne(gchatId, ['users', 'banned']);
        if (chat.owner.id == user.id)
            throw new common_1.HttpException('The owner cannot be banned!', common_1.HttpStatus.FORBIDDEN);
        if (!chat.users.find((u) => u.id == user.id))
            throw new common_1.HttpException('User is not in the group!', common_1.HttpStatus.NOT_FOUND);
        if (!chat.admins.find((adminId) => adminId == admin.id))
            throw new common_1.HttpException('User is not an admin in this group!', common_1.HttpStatus.FORBIDDEN);
        if (chat.banned.find((banned) => banned.user.id == user.id))
            throw new common_1.HttpException('User is already banned!', common_1.HttpStatus.FORBIDDEN);
        const time = new Date(Date.now() + temporary);
        const banned = this.bannedUserRepo.create({
            user,
            endOfBan: time,
            group: chat,
        });
        chat.users.splice(chat.users.findIndex((u) => u.id == user.id), 1);
        try {
            await this.groupChatRepo.save(chat);
            await this.bannedUserRepo.save(banned);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async muteUser(uid, gchatId, adminId) {
        const user = await this.userService.findOne(uid);
        const admin = await this.userService.findOne(adminId);
        const chat = await this.findOne(gchatId, ['users', 'muted']);
        if (chat.owner.id == user.id)
            throw new common_1.HttpException('The owner cannot be muted!', common_1.HttpStatus.FORBIDDEN);
        if (!chat.users.find((u) => u.id == user.id))
            throw new common_1.HttpException('User is not in the group!', common_1.HttpStatus.NOT_FOUND);
        if (!chat.admins.find((adminId) => adminId == admin.id))
            throw new common_1.HttpException('User is not an admin in this group!', common_1.HttpStatus.FORBIDDEN);
        if (chat.muted.find((u) => u.user.id == user.id))
            throw new common_1.HttpException('User is already muted!', common_1.HttpStatus.FORBIDDEN);
        const time = new Date(Date.now() + temporary);
        const muted = this.mutedUserRepo.create({
            user,
            endOfMute: time,
            group: chat,
        });
        try {
            await this.mutedUserRepo.save(muted);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addMessage(id, message, uid) {
        const user = await this.userService.findOne(uid);
        const chat = await this.findOne(id, ['users', 'messages', 'muted']);
        if (!chat.users.find((u) => u.id == user.id))
            throw new common_1.HttpException('User is not in the group', common_1.HttpStatus.NOT_FOUND);
        {
            const muted = chat.muted.find((u) => u.user.id == user.id);
            if (muted) {
                const time = new Date();
                if (muted.endOfMute > time)
                    throw new common_1.HttpException('User is muted from this group!', common_1.HttpStatus.FORBIDDEN);
                await this.unmuteUser(muted, chat);
            }
        }
        const log = this.logRepository.create({
            content: message,
            author: user,
        });
        try {
            await this.logRepository.save(log);
            await this.groupChatRepo
                .createQueryBuilder()
                .relation(entities_1.GroupChat, 'messages')
                .of(chat)
                .add(log);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(id) {
        const gchat = await this.findOne(id, ['users', 'muted', 'banned', 'logs']);
        await this.messageRepo.remove(gchat.messages);
        await this.mutedUserRepo.remove(gchat.muted);
        await this.bannedUserRepo.remove(gchat.banned);
        await this.groupChatRepo.remove(gchat);
    }
    async deleteUserFromGroup(uid, gid, admin) {
        const user = await this.userService.findOne(uid);
        const gchat = await this.findOne(gid, ['users']);
        if (admin && admin != user.id) {
            if (gchat.admins.indexOf(admin) == -1)
                throw new common_1.HttpException("User isn't admin in the group", common_1.HttpStatus.FORBIDDEN);
            if (user.id == gchat.owner.id)
                throw new common_1.HttpException('Cannot kick the owner', common_1.HttpStatus.FORBIDDEN);
            const index = gchat.admins.indexOf(user.id);
            if (index != -1)
                gchat.admins.splice(index, 1);
        }
        else if (user.id == gchat.owner.id)
            return await this.delete(gchat.id);
        {
            const index = gchat.users.findIndex((user1) => user1.id == user.id);
            if (index == -1)
                throw new common_1.HttpException('User is not in the group', common_1.HttpStatus.NOT_FOUND);
            gchat.users.splice(index, 1);
        }
        try {
            await this.groupChatRepo.save(gchat);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async unbannUser(user, gchat) {
        const index = gchat.banned.findIndex((user1) => user1.id == user.id);
        if (index == -1)
            return;
        await this.bannedUserRepo.delete(user.id);
    }
    async unmuteUser(user, gchat) {
        const index = gchat.muted.findIndex((user1) => user1.id == user.id);
        if (index == -1)
            return;
        await this.mutedUserRepo.delete(user.id);
    }
    async checkPassword(id, password) {
        if (!password)
            return false;
        const gchat = await this.findOne(id, [], true);
        if (!gchat)
            return false;
        return await argon.verify(gchat.password, password);
    }
};
GroupChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.GroupChat)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.GroupChat)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.Muted)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.Banned)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.Message)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], GroupChatService);
exports.GroupChatService = GroupChatService;
//# sourceMappingURL=group-chat.service.js.map