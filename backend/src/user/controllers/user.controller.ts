import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDto } from '../dto';
import { User } from '../entities';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get('/:username')
  getUserByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.getUserByUsername(username);
  }

  @Post('signup')
  async createUser(@Body() dto: UserDto): Promise<User> {
    return await this.userService.createUser(dto);
  }
}
