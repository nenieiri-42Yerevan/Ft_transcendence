import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/services/user.service';
import { SessionService } from '../../user/services/session.service';
import { UserDto } from '../../user/dto';
import * as crypto from 'crypto';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(
  	  private configService: ConfigService,
      private userService: UserService,
      private sessionService: SessionService,
	) {
    super({
      clientID: `${configService.get<string>('API_42_UID')}`,
      clientSecret: `${configService.get<string>('API_42_SECRET')}`,
      callbackURL: `${configService.get<string>('BACK_URL')}/transcendence/auth/signin/42/callback`,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
	//genereate random password
	const characters = 'abcdefghijklmqrstuvwxyzABCDEFGMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = crypto.randomInt(0, characters.length);
      password += characters.charAt(randomIndex);
    }

    const user = {
		first_name: profile.name.givenName,
		last_name: profile.name.familyName,
		username: profile.username,
		email: profile.emails[0].value,
		password: password,
	};

	let userDB = null;
	try {
      userDB = await this.userService.findOne(user.username);
	} catch (error)
	{
		if (error.status == 404)
			userDB = this.userService.create(user as UserDto);
	}

	const new_session = await this.sessionService.create(
		accessToken,
		refreshToken,
		userDB,
	);
	if (userDB.TFA_enabled == true)
		throw new HttpException("Provide your 2fa code", HttpStatus.FORBIDDEN);

    userDB.tokens = {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
	
    done(null, userDB);
  }
}
