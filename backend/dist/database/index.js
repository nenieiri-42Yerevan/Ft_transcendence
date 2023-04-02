"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
const entities_1 = require("../chat/entities");
const entities_2 = require("../user/entities");
let user = [entities_2.User, entities_2.Avatar, entities_2.Session, entities_2.Match];
let chat = [entities_1.Chat, entities_1.GroupChat, entities_1.Message, entities_1.Muted, entities_1.Banned];
let entities = [...user, ...chat];
exports.entities = entities;
//# sourceMappingURL=index.js.map