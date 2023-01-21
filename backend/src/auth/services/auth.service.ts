import { Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from '../dto';

@Injectable()
export class AuthService
{
	signup(dto: SignUpDto)
	{
		return 'signUp';
	}

	signin(dto: SignInDto)
	{
		return 'signIn';
	}
}
