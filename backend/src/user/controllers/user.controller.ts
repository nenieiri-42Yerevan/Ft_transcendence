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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from '../dto';
import { User } from '../entities';
import { AvatarService } from '../services/avatar.service';
import { UserService } from '../services/user.service';
import { Response } from 'express';
import { GetUserId, Public } from '../../common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';

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
    return this.userService.findOne(id);
  }

  @Get('/:username')
  findByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findOne(username);
  }

  @Get('avatar')
  async findAvatar(
    @GetUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const avatar = await this.userService.findAvatar(userId);

    res.set({
      'Content-Disposition': `inline; filename="${avatar.file}"`,
      'Content-Type': 'image/*',
    });

    return this.avatarService.toStreamableFile(avatar.data);
  }

  @Put('update-user')
  async updateUser(@GetUserId() id: number, @Body() user: User): Promise<User> {
    const current = await this.userService.findOne(id);

    return this.userService.update(current.id, user);
  }

  @Put('update-avatar')
  @UseInterceptors(FileInterceptor('file'))
  updateAvatar(
    @GetUserId() id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    return this.userService.setAvatar(id, file);
  }

  @Public()
  @Post('signup')
  async create(@Body() dto: UserDto): Promise<User> {
    return await this.userService.create(dto);
  }
}
