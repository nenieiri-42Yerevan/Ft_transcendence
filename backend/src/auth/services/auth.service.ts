import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, TokenDto } from '../dto';
import { UserService } from '../../user/services/user.service';
import { SessionService } from '../../user/services/session.service';
import { Session, User } from '../../user/entities';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';

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
        tokens.refresh_token,
        user,
      );
      return tokens;
    } else throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
  }

  // logout
  async logout(rt: string) {
    const session = await this.sessionService.read(rt);
    await this.sessionService.delete(session['id']);
  }

  // refresh
  async refreshTokens(userId: number, rt: string) {
    const user = await this.userService.findOne(userId, ['sessions']);

    if (user) {
      const session = await this.sessionService.read(rt);
      const tokens = await this.generateJWT(user.id, user.username);
      this.sessionService.update(session.id, {
        token: tokens.refresh_token,
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
}
