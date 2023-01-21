import { Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from '../dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService
{
	async signup(dto: SignUpDto)
	{
		const hash = await argon.hash(dto.password);

		return 'signUp';
	}

	signin(dto: SignInDto)
	{
		return 'signIn';
	}
}
