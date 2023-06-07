import {
  Injectable,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignInTFADto, SignInTFAwith42Dto, TokenDto } from '../dto';
import { UserService } from '../../user/services/user.service';
import { SessionService } from '../../user/services/session.service';
import { Session, User } from '../../user/entities';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
import * as speakeasy from 'speakeasy';

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
        throw new HttpException("Provide your 2fa code", HttpStatus.FORBIDDEN);
      return tokens;
    } else 
      throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
  }

  async fortyTwoCallback(@Res() res, @Req() req) {
	if (req.user.TFA_enabled == true)
	{
		res.cookie('username', req.user.username);
		res.redirect(`${this.configService.get<string>('FRONT_URL')}/transcendence/tfa_42`);
    return ;
	}

	const tokens = await this.generateJWT(req.user.id, req.user.username);
	const new_session = await this.sessionService.create(
		tokens.access_token,
		tokens.refresh_token,
		req.user
	);

	res.cookie('first_login', req.user.firstLogin);
	res.cookie('access_token', tokens.access_token);
    res.cookie('refresh_token', tokens.refresh_token);
    res.redirect(`${this.configService.get<string>('FRONT_URL')}/transcendence/redirect`);
  }

  // creatinhg user session and connection (2FA)
  async signinTFA(dto: SignInTFADto): Promise<TokenDto> {
    const user = await this.userService.findOne(dto.username);
    if (user && (await argon.verify(user.password, dto.password))) {
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
    } else 
    throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
  }
  
  async signinTFAwith42(dto: SignInTFAwith42Dto): Promise<TokenDto> {
    const user = await this.userService.findOne(dto.username);
    if (user) {
      const verified = speakeasy.totp.verify({
        secret: user.TFA_secret,
        encoding: 'base32',
        token: dto.TFA,
        window: 1
      });
      
      if (!verified)
        throw new HttpException('Wrong TFA', HttpStatus.UNAUTHORIZED);
      const tokens = await this.generateJWT(user.id, user.username);
      const new_session = await this.sessionService.create(
        tokens.access_token,
        tokens.refresh_token,
        user,
      );
      return tokens;
    } else 
    throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
  }

  // logout
  async logout(at: string) {
    const session = await this.sessionService.read_AT(at);
    await this.sessionService.delete(session['id']);
  }

  // refresh
  async refreshTokens(userId: number, rt: string): Promise<TokenDto> {
    const user = await this.userService.findOne(userId, ['sessions']);
    if (user) {
	  let sessionID = null;
	  for (const session of user.sessions) {
	    if (session.refresh_token == rt) {
		  sessionID = session.id;
		  break;
		}
	  }
	  if (!sessionID)
    	throw new HttpException('Session not found for this user', HttpStatus.NOT_FOUND);
      const tokens = await this.generateJWT(user.id, user.username);
      this.sessionService.update(sessionID, {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      } as Session);
      return tokens;
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
          expiresIn: 60 * 60 * 24,
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
  async verifyJWT(token: string): Promise<any> {
    try {
	  const secret = this.configService.get<string>('AT_TOKEN');
      return await this.jwtService.verifyAsync(token, { secret });
    } catch {
        console.log("JWT NOT VERIFIED");
      return null;
    }
  }

  // retrieving user from socket
  async retrieveUser(client: Socket): Promise<User> {
    console.log("Find user block");
    const authorization = client.handshake.headers.authorization;
    const token = authorization && authorization.split(' ')[1];

    if (!token) return null;
    console.log("Token found!", token);
    const payload = await this.verifyJWT(token);
    if (!payload) return null;
    console.log("Payload found!", payload);
    
    const user = await this.userService.findOne(payload.sub).catch(() => null);
    if (!user) return null;
    console.log("User found!");

    return user;
  }

  async enableTFA(userId: number) : Promise<string>
  {
	  try
	  {
		  const secret = speakeasy.generateSecret().base32;
      this.userService.update(userId, {TFA_enabled: true, TFA_secret: secret} as User);
		  return secret;
	  }
    catch (error)
	  { 
		  throw new HttpException('Error when generating the 2FA secret', 
		  							HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }

  async disableTFA(userId: number)
  {
    await this.userService.update(userId, {TFA_enabled: false, TFA_secret: null} as User);
  }
}
