import { Injectable } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private jwtModule: JwtModule) {}

	// verifying JSON Web Token
	verifyJWT() {}

	// creatinhg user session and connection
	login() {}

	// perform the authorization
	getUserFromSocket() {}

	// generating and returning JSON Web Token
	async generateJWT(userId: number)
	{
		const [at, rt] = await Promise.all([
			this.jwtModule.signAsync(
			{
				sub: userId,
			},
			{
				secret: 'at-token';
				expiresIn: 60 * 15,
			}),
			this.jwtModule.signAsync(
			{
				sub: userId,
			},
			{
				secret: 'rt-token',
				expiresIn: 60 * 60 * 24 * 7,
			}),
		]);
		return ({
			accessToken: at,
			refreshToken: at,
		});
	}
}
