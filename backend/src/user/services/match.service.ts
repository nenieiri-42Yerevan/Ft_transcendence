import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../entities';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match) private readonly matchRepo: Repository<Match>,
  ) {}

  /* CREATE */

  async create(obj: Match): Promise<Match> {
    let match: Match = this.matchRepo.create({
      date: new Date(),
      ...obj,
    } as Match);

    try {
      this.matchRepo.save(match);
    } catch (error) {
      throw new HttpException(error.messgae, HttpStatus.BAD_REQUEST);
    }

    return match;
  }

  /* UPDATE */

  async update(id: number, newMatch: Match): Promise<Match> {
    if (!newMatch)
      throw new HttpException('Body is null', HttpStatus.NOT_FOUND);
    await this.matchRepo.findOne({ where: { id } });

    try {
      newMatch.id = id;
      await this.matchRepo.update(id, newMatch);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    delete newMatch.id;
    return newMatch;
  }

  /* DELETE */

  async delete(id: number): Promise<void> {
    try {
      await this.matchRepo.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
