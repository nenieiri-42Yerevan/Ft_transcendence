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
exports.GroupChat = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../user/entities");
const muted_entity_1 = require("./muted.entity");
const banned_entity_1 = require("./banned.entity");
const chat_entity_1 = require("./chat.entity");
const message_entity_1 = require("./message.entity");
let GroupChat = class GroupChat extends chat_entity_1.Chat {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], GroupChat.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], GroupChat.prototype, "public", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GroupChat.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_1.User)
], GroupChat.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { array: true, default: [] }),
    __metadata("design:type", Array)
], GroupChat.prototype, "admins", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => muted_entity_1.Muted, (muted) => muted.group, { eager: true }),
    __metadata("design:type", Array)
], GroupChat.prototype, "muted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => banned_entity_1.Banned, (banned) => banned.group, { eager: true }),
    __metadata("design:type", Array)
], GroupChat.prototype, "banned", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => entities_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], GroupChat.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.chat, { eager: true }),
    __metadata("design:type", Array)
], GroupChat.prototype, "messages", void 0);
GroupChat = __decorate([
    (0, typeorm_1.Entity)()
], GroupChat);
exports.GroupChat = GroupChat;
//# sourceMappingURL=group-chat.entity.js.map