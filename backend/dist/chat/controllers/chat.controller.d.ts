import { PasswordDto } from '../dto/password.dto';
import { GroupChat, Chat, Message, Banned, Muted } from '../entities';
import { ChatService } from '../services/chat.service';
import { GroupChatService } from '../services/group-chat.service';
export declare class ChatController {
    private readonly chatService;
    private readonly groupChatService;
    constructor(chatService: ChatService, groupChatService: GroupChatService);
    findAllForUser(uid: number): Promise<Chat[]>;
    findChatById(id: number): Promise<Chat>;
    findAllGroups(): Promise<GroupChat[]>;
    findGroupById(gid: number): Promise<GroupChat>;
    createChat(uid: number, tid: number): Promise<Chat>;
    createGroupChat(uid: number, gchat: GroupChat): Promise<GroupChat>;
    createChatMessage(cid: number, uid: number, text: string): Promise<Message>;
    updatePassword(gid: number, uid: number, pass: PasswordDto): Promise<void>;
    addMessage(gid: number, uid: number, text: string): Promise<void>;
    addUser(uid: number, gchat: GroupChat): Promise<void>;
    deleteUserFromGroup(uid: number, gid: number): Promise<void>;
    bannUser(uid: number, gid: number, adminId: number): Promise<void>;
    unbanUser(user: Banned, gchat: GroupChat): Promise<void>;
    muteUser(uid: number, gid: number, adminId: number): Promise<void>;
    unmuteUser(user: Muted, gchat: GroupChat): Promise<void>;
    delete(uid: number): Promise<void>;
}
