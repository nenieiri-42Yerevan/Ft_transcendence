import {
	Controller,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	UseGuards,
	Req
} from '@nestjs/common';
import { AtGuard, RtGuard } from '../../common/guards';
import { AuthService } from '../services/auth.service';
import { SignInDto, SignInTFADto, TokenDto } from '../dto';
import { Request } from 'express';
import { GetUser, GetUserId, Public } from '../../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin/local')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SignInDto): Promise<TokenDto> {
    return this.authService.signinLocal(dto);
  }

  @Public()
  @Post('signin/2FA')
  @HttpCode(HttpStatus.OK)
  signinTFA(@Body() dto: SignInTFADto): Promise<TokenDto> {
    return this.authService.signinTFA(dto);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser('accessToken') accessToken: string) {
	  this.authService.logout(accessToken);
  }

  @Post('TFA_enable')
  @HttpCode(HttpStatus.OK)
  enableTFA(
    @GetUserId() userId: number
  ): Promise<string> {
	  return this.authService.enableTFA(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
  		@GetUserId() userId: number,
  		@GetUser('refreshToken') refreshToken: string
	): Promise<TokenDto> {
	  return this.authService.refreshTokens(userId, refreshToken);
  }
}
