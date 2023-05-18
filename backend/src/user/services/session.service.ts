import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session, User } from '../entities';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  /* CREATE */

  async create(
    access_token: string,
    refresh_token: string,
    owner: User,
  ): Promise<Session> {
    let session = this.sessionRepo.create({
      access_token,
      refresh_token,
      owner,
    });

    try {
      await this.sessionRepo.save(session);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return session;
  }

  /* READ */

  async findOneBytoken(rtoken: string): Promise<User> {
    let session = null;

    if (!rtoken)
      throw new HttpException(
        'Invalid token provided!',
        HttpStatus.BAD_REQUEST,
      );

    try {
      session = await this.sessionRepo.findOne({
        where: { refresh_token: rtoken },
        relations: ['owner'],
      });
    } catch (error) {
      throw new HttpException('Session not found', HttpStatus.BAD_REQUEST);
    }

    return session.owner;
  }

  async read_AT(access_token: string): Promise<Session> {
    let session = null;

    if (access_token)
      session = await this.sessionRepo.findOne({ where: { access_token } });

    if (!session)
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);

    return session;
  }

  async read_RT(refresh_token: string): Promise<Session> {
    let session = null;
    if (refresh_token)
      session = await this.sessionRepo.findOne({ where: { refresh_token } });

    if (!session)
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);

    return session;
  }

  /* UPDATE */

  async update(id: number, session: Session): Promise<Session> {
    if (!session) throw new HttpException('Body is null', HttpStatus.NOT_FOUND);

    try {
      session.id = id;
      await this.sessionRepo.update(id, session);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    delete session.id;
    return session;
  }

  /* DELETE */

  async delete(id: number): Promise<void> {
    try {
      await this.sessionRepo.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
