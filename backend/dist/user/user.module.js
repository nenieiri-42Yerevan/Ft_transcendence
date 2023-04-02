"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_controller_1 = require("./controllers/user.controller");
const entities_1 = require("./entities");
const avatar_service_1 = require("./services/avatar.service");
const match_service_1 = require("./services/match.service");
const session_service_1 = require("./services/session.service");
const user_service_1 = require("./services/user.service");
let entities = [entities_1.User, entities_1.Avatar, entities_1.Session, entities_1.Match];
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature(entities)],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, avatar_service_1.AvatarService, session_service_1.SessionService, match_service_1.MatchService],
        exports: [user_service_1.UserService, session_service_1.SessionService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map