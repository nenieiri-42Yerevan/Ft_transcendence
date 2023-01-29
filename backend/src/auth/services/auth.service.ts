import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dto';
import { UserService } from '../../user/services/user.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	// verifying JSON Web Token
	verifyJWT() {}

	// creatinhg user session and connection
	async signinLocal(dto: SignInDto)
	{
		const user = await this.userService.findByUsername(dto.username);

		if (user && await argon.verify(user.password, dto.password))
			return (user);
		else
			throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
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
