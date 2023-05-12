import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private configService: ConfigService) {
    super({
      clientID: `${configService.get<string>('42_API_UID')}`,
      clientSecret: `${configService.get<string>('42_API_SECRET')}`,
      callbackURL: `${configService.get<string>('BACK_URL')}/auth/signin/42/callback`,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const user = { fortytwoId: profile.id };
    done(null, user);
  }
}