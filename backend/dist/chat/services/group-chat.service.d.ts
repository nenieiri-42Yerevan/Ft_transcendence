import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { GroupChatDto } from '../dto/group-chat.dto';
import { Banned, GroupChat, Message, Muted } from '../entities';
import { PasswordDto } from '../dto/password.dto';
export declare class GroupChatService {
    private readonly userService;
    private readonly groupChatRepo;
    private readonly messageRepo;
    private readonly mutedUserRepo;
    private readonly bannedUserRepo;
    private readonly logRepository;
    constructor(userService: UserService, groupChatRepo: Repository<GroupChat>, messageRepo: Repository<Message>, mutedUserRepo: Repository<Muted>, bannedUserRepo: Repository<Banned>, logRepository: Repository<Message>);
    createGroupChat(gchat: GroupChatDto, uid: number): Promise<GroupChat>;
    findOne(groupId: number, relations?: string[], needPass?: boolean): Promise<GroupChat>;
    findAll(): Promise<GroupChat[]>;
    findUserGroups(uid: number): Promise<GroupChat[]>;
    updatePassword(pass: PasswordDto, gid: number, uid: number): Promise<void>;
    addUser(gchat: GroupChat, uid: number): Promise<void>;
    bannUser(uid: number, gchatId: number, adminId: number): Promise<void>;
    muteUser(uid: number, gchatId: number, adminId: number): Promise<void>;
    addMessage(id: number, message: string, uid: number): Promise<void>;
    delete(id: number): Promise<void>;
    deleteUserFromGroup(uid: number, gid: number, admin?: number): Promise<void>;
    unbannUser(user: Banned, gchat: GroupChat): Promise<void>;
    unmuteUser(user: Muted, gchat: GroupChat): Promise<void>;
    checkPassword(id: number, password: string): Promise<boolean>;
}
