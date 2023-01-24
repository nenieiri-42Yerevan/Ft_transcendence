import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  createUser(dto: UserDto) {
    const user = new User();

    user.first_name = dto.first_name;
    user.last_name = dto.last_name;
    user.username = dto.username;
    user.email = dto.email;
    user.password = dto.password;
    user.gender = dto.gender;
    user.date_of_birth = dto.date_of_birth;

    return this.userRepo.save(user);
  }
}
