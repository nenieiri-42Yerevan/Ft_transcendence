import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from '../dto';
import { Match, User } from '../entities';
import { AvatarService } from '../services/avatar.service';
import { UserService } from '../services/user.service';
import { Response } from 'express';
import { Public } from '../../common/decorators';
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

  @Get('/:id/avatar')
  async findAvatar(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const avatar = await this.userService.findAvatar(id);

    res.set({
      'Content-Disposition': `inline; filename="${avatar.file}"`,
      'Content-Type': 'image/*',
    });

    return this.avatarService.toStreamableFile(avatar.data);
  }

  @Get('/matches/:id')
  findMatches(@Param('id', ParseIntPipe) id: number): Promise<Match[]> {
    return this.userService.findMatches(id);
  }

  @Put('/update-user:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User,
  ): Promise<User> {
    const current = await this.userService.findOne(id);

    return this.userService.update(current.id, user);
  }

  @Put('/update-avatar:id')
  @UseInterceptors(FileInterceptor('file'))
  updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    return this.userService.setAvatar(id, file);
  }

  @Put('/follow/:uid/:tid')
  toggleUserFollowed(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('tid', ParseIntPipe) tid: number,
  ): Promise<number[]> {
    return this.userService.toggleFollow(uid, tid);
  }

  @Put('/block/:uid/:tid')
  toggleUserBlocked(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('tid', ParseIntPipe) tid: number,
  ): Promise<number[]> {
    return this.userService.toggleBlock(uid, tid);
  }

  @Public()
  @Post('/signup')
  async create(@Body() dto: UserDto): Promise<User> {
    return await this.userService.create(dto);
  }
}
