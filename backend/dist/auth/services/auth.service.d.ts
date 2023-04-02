import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignInTFADto, TokenDto } from '../dto';
import { UserService } from '../../user/services/user.service';
import { SessionService } from '../../user/services/session.service';
import { User } from '../../user/entities';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
export declare class AuthService {
    private userService;
    private sessionService;
    private jwtService;
    private configService;
    constructor(userService: UserService, sessionService: SessionService, jwtService: JwtService, configService: ConfigService);
    signinLocal(dto: SignInDto): Promise<TokenDto>;
    signinTFA(dto: SignInTFADto): Promise<TokenDto>;
    logout(at: string): Promise<void>;
    refreshTokens(userId: number, rt: string): Promise<TokenDto>;
    generateJWT(userId: number, username: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    verifyJWT(token: string): any;
    retrieveUser(client: Socket): Promise<User>;
    enableTFA(userId: number): Promise<string>;
    disableTFA(userId: number): Promise<void>;
}
