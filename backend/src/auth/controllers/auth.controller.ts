import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto, SignInDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup();
  }

  @Post('signin')
  signin(@Body() dto: SignInDto) {
	console.log({
		dto,
	})
    return this.authService.signin();
  }
}
