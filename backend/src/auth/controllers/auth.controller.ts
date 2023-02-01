import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto, TokenDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin/local')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SignInDto): Promise<TokenDto> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout() {
//	  this.authService.logout();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens() {
	  this.authService.refreshTokens();
  }
}
