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
exports.User = exports.Status = void 0;
const chat_entity_1 = require("../../chat/entities/chat.entity");
const typeorm_1 = require("typeorm");
const index_1 = require("./index");
var Status;
(function (Status) {
    Status[Status["OFFLINE"] = 0] = "OFFLINE";
    Status[Status["ONLINE"] = 1] = "ONLINE";
    Status[Status["GAME"] = 2] = "GAME";
    Status[Status["CHAT"] = 3] = "CHAT";
})(Status = exports.Status || (exports.Status = {}));
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true, length: 45 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true, length: 45 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, select: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', nullable: false, enum: ['male', 'female'] }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Status.OFFLINE }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "TFA_enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "TFA_secret", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => 'NOW()' }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { array: true, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "follows", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { array: true, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "blocked", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => index_1.Avatar, (avatar) => avatar.user),
    __metadata("design:type", index_1.Avatar)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => index_1.Session, (session) => session.owner),
    __metadata("design:type", Array)
], User.prototype, "sessions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => index_1.Match, (match) => match.winner),
    __metadata("design:type", Array)
], User.prototype, "won", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => index_1.Match, (match) => match.loser),
    __metadata("design:type", Array)
], User.prototype, "lost", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => chat_entity_1.Chat, (chat) => chat.users),
    __metadata("design:type", Array)
], User.prototype, "chats", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map