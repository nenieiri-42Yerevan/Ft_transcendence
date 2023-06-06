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
import { PasswordDto, UserDto, UserUpdateDto } from '../dto';
import { Match, Status, User } from '../entities';
import { AvatarService } from '../services/avatar.service';
import { UserService } from '../services/user.service';
import { Response } from 'express';
import { Public, GetUserId } from '../../common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { SessionService } from '../services/session.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly avatarService: AvatarService,
  ) {}

  @Get('/')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/by-token/:token')
  findBySession(@Param('token') rtoken: string): Promise<User> {
    return this.sessionService.findOneBytoken(rtoken);
  }

  @Get('/by-name/:username')
  findByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findOne(username);
  }

  @Get('/by-id/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get('/:id/avatar')
  async findAvatar(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const avatar = await this.userService.findAvatar(id);

    if (!avatar) return null;

    res.set({
      'Content-Disposition': `inline; filename="${avatar.file}"`,
      'Content-Type': 'image/*',
    });

    return this.avatarService.toStreamableFile(avatar.data);
  }

  @Get('/:id/matches')
  findMatches(@Param('id', ParseIntPipe) id: number): Promise<Match[]> {
    return this.userService.findMatches(id);
  }

  @Get('/:id/follows')
  findFollows(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    return this.userService.findFollows(id);
  }

  @Get('/:id/blocked')
  findBlocked(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    return this.userService.findBlocked(id);
  }

  @Get('/:id/status')
  findStatus(@Param('id', ParseIntPipe) id: number): Promise<Status> {
    return this.userService.findStatus(id);
  }

  @Put('/update-user/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserUpdateDto,
  ): Promise<User> {
    return this.userService.update(id, user as User);
  }

  @Put('/update-password/:id')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() pass: PasswordDto,
  ): Promise<User> {
    return this.userService.updatePassword(id, pass.old, pass.current);
  }

  @Put('/update-avatar/:id')
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
