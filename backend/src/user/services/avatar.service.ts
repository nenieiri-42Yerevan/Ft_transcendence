import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Readable } from 'typeorm/platform/PlatformTools';
import { Avatar, User } from '../entities';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar) private readonly avatarRepo: Repository<Avatar>,
  ) {}

  /* CREATE */

  async create(file: string, user: User, data: Buffer): Promise<Avatar> {
    let avatar = this.avatarRepo.create({ file, user, data });

    try {
      await this.avatarRepo.save(avatar);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return avatar;
  }

  /* UPDATE */

  async update(id: number, newAvatar: Avatar) {
    if (!newAvatar)
      throw new HttpException('Body is null', HttpStatus.NOT_FOUND);
    await this.avatarRepo.findOne({ where: { id } });

    try {
      newAvatar.id = id;
      await this.avatarRepo.update(id, newAvatar);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    delete newAvatar.id;
    return newAvatar;
  }

  toStreamableFile(data: Buffer): StreamableFile {
    return new StreamableFile(Readable.from(data));
  }

  /* DELETE */

  async delete(id: number): Promise<void> {
    try {
      await this.avatarRepo.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
