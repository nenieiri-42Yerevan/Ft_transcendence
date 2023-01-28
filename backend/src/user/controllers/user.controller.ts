import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../dto';
import { User } from '../entities';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('signup')
  async createUser(@Body() dto: UserDto): Promise<User> {
    return await this.service.createUser(dto);
  }
}
