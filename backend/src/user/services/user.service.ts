import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { UserDto } from '../dto';
import { Status, User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // CREATE

  async createUser(dto: UserDto) {
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

  // READ

  getAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  async getUser(id: number, relations = [] as string[]): Promise<User> {
    let user = null;

    if (id) user = await this.userRepo.findOne({ where: { id }, relations });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  // UPDATE

  async updateUser(id: number, user: User): Promise<User> {
    // check for user  with id:id and null body
    if (!user) throw new HttpException('Body is null', HttpStatus.NOT_FOUND);
    await this.getUser(id);

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
    let user = await this.getUser(id);

    if (user.status == status) return;

    try {
      await this.userRepo.update(user.id, { status });
      // TODO: notify user
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // DELETE

  async deleteUser(id: number): Promise<User> {
    let user = this.getUser(id);

    await this.userRepo.delete(id);
    return user;
  }
}
