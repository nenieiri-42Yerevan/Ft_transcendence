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
import { SignInDto, TokenDto } from '../dto';
import { Request } from 'express';
import { GetUser, GetUserId } from '../../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin/local')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SignInDto): Promise<TokenDto> {
    return this.authService.signinLocal(dto);
  }

  @UseGuards(RtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser('refreshToken') refreshToken: string) {
	  this.authService.logout(refreshToken);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
  		@GetUserId() userId: number,
  		@GetUser('refreshToken') refreshToken: string
	) {
	  this.authService.refreshTokens(userId, refreshToken);
  }
}
