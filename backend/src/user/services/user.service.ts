import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

import multer from 'multer';
import { User, Avatar, Status } from '../entities/';
import { UserDto } from '../dto';
import { AvatarService } from './avatar.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly avatarService: AvatarService,
  ) {}

  /* CREATE */

  async create(dto: UserDto): Promise<User> {
    const user = new User();

    user.first_name = dto.first_name;
    user.last_name = dto.last_name;
    user.username = dto.username;
    user.email = dto.email;
    user.password = await argon.hash(dto.password);
    user.gender = dto.gender;
    user.date_of_birth = dto.date_of_birth;

    return this.userRepo.save(user);
  }

  /* READ */

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(property, relations = [] as string[]): Promise<User> {
    let user = null;

    if (property && typeof property == 'number') {
      user = await this.userRepo.findOne({
        where: { id: property },
        relations,
      });
    } else {
      user = await this.userRepo.findOne({
        where: { username: property },
        relations,
      });
    }

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async getAvatar(id: number): Promise<Avatar> {
    const user: User = await this.findOne(id, ['avatar']);
    if (!user.avatar)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user.avatar;
  }

  /* UPDATE */

  async updateUser(id: number, user: User): Promise<User> {
    // check for user  with id:id and null body
    if (!user) throw new HttpException('Body is null', HttpStatus.NOT_FOUND);
    await this.findOne(id);

    // check for modifiable updates
    const modifiable: Array<string> = ['first_name', 'last_name', 'username'];

    for (const key of Object.keys(user)) {
      if (modifiable.indexOf(key) == -1)
        throw new HttpException(
          'Value cannot be modified',
          HttpStatus.FORBIDDEN,
        );
    }

    // check for empty username
    if (user.username) {
      user.username = user.username.replace(/\s+/g, '');
      if (!user.username.length)
        throw new HttpException(
          'Username cannot be empty',
          HttpStatus.FORBIDDEN,
        );
    }

    // update user
    try {
      user.id = id;
      await this.userRepo.update(id, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    delete user.id;
    return user;
  }

  async updateRank(winner: User, loser: User): Promise<void> {
    try {
      await this.userRepo.update(winner.id, { rank: winner.rank + 1 });
      if (loser.rank > 0)
        await this.userRepo.update(loser.id, { rank: loser.rank - 1 });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async setStatus(id: number, status: Status) {
    let user = await this.findOne(id);

    if (user.status == status) return;

    try {
      await this.userRepo.update(user.id, { status });
      // TODO: notify user
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async setAvatar(userId: number, file: Express.Multer.File): Promise<void> {
    if (!file)
      throw new HttpException('File required', HttpStatus.NOT_ACCEPTABLE);

    const filename = file.originalname;
    const data = file.buffer;

    const user: User = await this.findOne(userId, ['avatar']);

    await this.avatarService.create(filename, user, data);
    if (user.avatar) await this.avatarService.delete(user.avatar.id);
  }

  /* DELETE */

  async delete(id: number): Promise<User> {
    let user = await this.findOne(id);

    await this.userRepo.remove(user);
    return user;
  }
}
