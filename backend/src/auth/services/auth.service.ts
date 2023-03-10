import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignInTFADto, TokenDto } from '../dto';
import { UserService } from '../../user/services/user.service';
import { SessionService } from '../../user/services/session.service';
import { Session, User } from '../../user/entities';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
import { speakeasy } from 'speakeasy';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // creatinhg user session and connection
  async signinLocal(dto: SignInDto): Promise<TokenDto> {
    const user = await this.userService.findOne(dto.username);

    if (user && (await argon.verify(user.password, dto.password))) {
      const tokens = await this.generateJWT(user.id, user.username);
      const new_session = await this.sessionService.create(
        tokens.access_token,
        tokens.refresh_token,
        user,
      );
	  if (user.TFA_enabled == true)
		  throw new HttpException(user.username, HttpStatus.FORBIDDEN);
      return tokens;
    } else throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
  }

  // creatinhg user session and connection (2FA)
  async signinTFA(dto: SignInTFADto): Promise<TokenDto> {
    const user = await this.userService.findOne(dto.username);
	  
	  const verified = speakeasy.totp.verify({
		 secret: user.TFA_secret,
		 encoding: 'base32',
		 token: dto.TFA,
		 window: 1
	  });
	  if (!verified)
		  throw new HttpException('Wrong TFA', HttpStatus.NOT_FOUND);

      const tokens = await this.generateJWT(user.id, user.username);
      const new_session = await this.sessionService.create(
        tokens.access_token,
        tokens.refresh_token,
        user,
      );

      return tokens;
  }

  // logout
  async logout(at: string) {
    const session = await this.sessionService.read_AT(at);
    await this.sessionService.delete(session['id']);
  }

  // refresh
  async refreshTokens(userId: number, rt: string) {
    const user = await this.userService.findOne(userId, ['sessions']);

    if (user) {
      const session = await this.sessionService.read_RT(rt);
      const tokens = await this.generateJWT(user.id, user.username);
      this.sessionService.update(session.id, {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      } as Session);
    } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  // generating and returning JSON Web Token
  async generateJWT(userId: number, username: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username: username,
        },
        {
          secret: this.configService.get<string>('AT_TOKEN'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username: username,
        },
        {
          secret: this.configService.get<string>('RT_TOKEN'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  // verifying JWT token
  verifyJWT(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch {
      return null;
    }
  }

  // retrieving user from socket
  async retrieveUser(client: Socket): Promise<User> {
    const authorization = client.handshake.headers.authorization;
    const token = authorization && authorization.split(' ')[1];

    if (!token) return null;

    const payload = this.verifyJWT(token);
    if (!payload) return null;

    const user = await this.userService.findOne(payload.sub).catch(() => null);
    if (!user) return null;

    return user;
  }

  async enableTFA(userId: number) : Promise<string>
  {
    const user = await this.userService.findOne(userId);
	  try
	  {
		  const secret = speakeasy.generateSecret().base32;
		  user.TFA_secret = secret;
		  return secret;
	  } catch (error)
	  {
		  throw new HttpException('Error when generating the 2FA secret', 
		  							HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }

  async disableTFA(userId: number)
  {
    const user = await this.userService.findOne(userId);
	user.TFA_secret = null;
  }
}
