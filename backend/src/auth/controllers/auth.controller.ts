import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin/local')
  signinLocal(@Body() dto: SignInDto) {
    return this.authService.signinLocal(dto);
  }
}
