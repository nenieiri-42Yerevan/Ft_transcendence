import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dto';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	// verifying JSON Web Token
	verifyJWT() {}

	// creatinhg user session and connection
	signinLocal(dto: SignInDto)
	{
		return (this.userService.findAll());
	}

	// perform the authorization
	getUserFromSocket() {}

	// generating and returning JSON Web Token
	async generateJWT(userId: number)
	{
		const [at, rt] = await Promise.all([
			this.jwtService.signAsync
			(
				{
					sub: userId,
				},
				{
					secret: 'at-token',
					expiresIn: 60 * 15,
				}
			),
			this.jwtService.signAsync
			(
				{
					sub: userId,
				},
				{
					secret: 'rt-token',
					expiresIn: 60 * 60 * 24 * 7,
				}
			),
		]);
		return ({
			accessToken: at,
			refreshToken: at,
		});
	}
}
