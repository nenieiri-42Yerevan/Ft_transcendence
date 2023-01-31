import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'rt-token',
			passReqToCallback: true,
		})
	}

	validate(req: Request, payload: any) {
		const refreshToken = req.get('authorization').replace('Bearer', '').trim();
		return ({
			...payload,
			refreshToken,
		});
	}
}
