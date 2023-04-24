import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('AT_TOKEN'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const accessToken = req.get('authorization').replace('Bearer', '').trim();
    return {
      ...payload,
      accessToken,
    };
  }
}
