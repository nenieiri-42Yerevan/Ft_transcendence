import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('signup')
  createUser(@Body() dto: UserDto) {
    const user = new User();
    user.first_name = dto.first_name;
    user.last_name = dto.last_name;
    console.log(dto.last_name);
    user.username = dto.username;
    user.email = dto.email;
    user.password = dto.password;
    user.gender = dto.gender;

    return this.service.createUser(user);
  }
}
