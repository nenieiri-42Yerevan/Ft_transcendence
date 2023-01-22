import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('signup')
  createUser(@Body() dto: UserDto) {
    return this.service.createUser(dto);
  }
}
