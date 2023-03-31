import { AuthService } from '../services/auth.service';
import { SignInDto, SignInTFADto, TokenDto } from '../dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signinLocal(dto: SignInDto): Promise<TokenDto>;
    signinTFA(dto: SignInTFADto): Promise<TokenDto>;
    logout(accessToken: string): void;
    refreshTokens(userId: number, refreshToken: string): Promise<TokenDto>;
}
