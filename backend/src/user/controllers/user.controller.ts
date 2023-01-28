import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { UserDto } from '../dto';
import { User } from '../entities';
import { AvatarService } from '../services/avatar.service';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly avatarService: AvatarService,
  ) {}

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

  @Get('/:id/avatar')
  async getAvatar(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const avatar = await this.userService.getAvatar(id);

    res.headers.append(
      'Content-Disposition',
      `inline; filename="${avatar.file}"`,
    );
    res.headers.append('Content-Type', 'image/*');

    return this.avatarService.toStreamableFile(avatar.data);
  }

  @Put('/:id/update')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User,
  ): Promise<User> {
    const current = await this.getUserById(id);

    return this.userService.updateUser(current.id, user);
  }

  @Post('signup')
  async createUser(@Body() dto: UserDto): Promise<User> {
    return await this.userService.createUser(dto);
  }
}
