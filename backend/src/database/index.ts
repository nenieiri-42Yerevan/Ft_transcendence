import { Banned, Chat, GroupChat, Message, Muted } from 'src/chat/entities';
import { User, Avatar, Session, Match } from 'src/user/entities';

let user = [User, Avatar, Session, Match];
let chat = [Chat, GroupChat, Message, Muted, Banned];

let entities = [...user, ...chat];

export { entities };
