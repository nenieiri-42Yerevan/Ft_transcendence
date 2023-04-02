import { Banned, Chat, Message, Muted } from 'src/chat/entities';
import { User, Avatar, Session, Match } from 'src/user/entities';
declare let entities: (typeof User | typeof Avatar | typeof Session | typeof Match | typeof Chat | typeof Message | typeof Muted | typeof Banned)[];
export { entities };
