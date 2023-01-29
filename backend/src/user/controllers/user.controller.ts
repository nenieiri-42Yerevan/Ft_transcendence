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
import { Response } from 'express'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly avatarService: AvatarService,
  ) {}

  @Get('/')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Get('/:username')
  findByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  @Get('/:id/avatar')
  async findAvatar(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const avatar = await this.userService.getAvatar(id);

    res.set(
		{
			'Content-Disposition': `inline; filename="${avatar.file}"`,
			'Content-Type': 'image/*',
		}
	);

    return this.avatarService.toStreamableFile(avatar.data);
  }

  @Put('/:id/update')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User,
  ): Promise<User> {
    const current = await this.userService.findById(id);

    return this.userService.updateUser(current.id, user);
  }

  @Post('signup')
  async create(@Body() dto: UserDto): Promise<User> {
    return await this.userService.create(dto);
  }
}
