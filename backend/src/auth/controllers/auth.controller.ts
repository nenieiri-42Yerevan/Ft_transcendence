import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AtGuard, RtGuard } from '../../common/guards';
import { AuthService } from '../services/auth.service';
import { SignInDto, SignInTFADto, SignInTFAwith42Dto, TokenDto } from '../dto';
import { GetUser, GetUserId, Public } from '../../common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
  	  private authService: AuthService,
  ) {}

  @Public()
  @Get('signin/42')
  @UseGuards(AuthGuard('42'))
  async fortyTwoLogin() {
    // This route should redirect the user to 42's login page
  }

  @Public()
  @Get('signin/42/callback')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('42'))
  fortyTwoCallback(@Res() res, @Req() req) {
    // This route handles the callback after the user has logged in
    this.authService.fortyTwoCallback(res, req);
  }

  @Public()
  @Post('signin/2FA_42')
  @HttpCode(HttpStatus.OK)
  signinTFAwith42(@Body() dto: SignInTFAwith42Dto): Promise<TokenDto> {
    return this.authService.signinTFAwith42(dto);
  }

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

  @Post('TFA_disable')
  @HttpCode(HttpStatus.OK)
  disableTFA(
    @GetUserId() userId: number
  ) {
	  this.authService.disableTFA(userId);
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
