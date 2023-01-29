import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto, TokenDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin/local')
  signinLocal(@Body() dto: SignInDto): Promise<TokenDto> {
    return this.authService.signinLocal(dto);
  }
}
