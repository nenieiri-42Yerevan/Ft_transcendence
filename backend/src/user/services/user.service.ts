import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { User, Avatar, Status, Match } from '../entities/';
import { UserDto } from '../dto';
import { AvatarService } from './avatar.service';
import { NotifyService } from 'src/notify/notify.service';

@Injectable()
export class UserService {
  constructor(
    private readonly avatarService: AvatarService,
    private readonly notifyService: NotifyService,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,
  ) {}

  /* ------------------------ CREATE ------------------------ */

  async create(dto: UserDto): Promise<User> {
    let user = await this.userRepo.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });

    if (user !== null) {
      if (user.username === dto.username)
        throw new HttpException(
          `userrname ${dto.username} is already occupied`,
          HttpStatus.BAD_REQUEST,
        );
      else
        throw new HttpException(
          `email ${dto.email} is already occupied`,
          HttpStatus.BAD_REQUEST,
        );
    }

    user = new User();

    user.first_name = dto.first_name;
    user.last_name = dto.last_name;
    user.username = dto.username;
    user.username_42 = dto.username_42;
    user.email = dto.email;
    user.password = await argon.hash(dto.password);
    user.gender = dto.gender;
    user.date_of_birth = dto.date_of_birth;
    user.user_42 = dto.user_42;

    try {
      await this.userRepo.save(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  /* ------------------------- READ ------------------------- */

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(property, relations = [] as string[]): Promise<User> {
    let user = null;

    if (property && typeof property == 'number') {
      user = await this.userRepo.findOne({
        where: { id: property },
        relations,
      });
    } else {
      user = await this.userRepo.findOne({
        where: { username: property },
        relations,
      });
    }

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    console.log(user);
    return user;
  }

  async findOne_42(property, relations = [] as string[]): Promise<User> {
    let user = null;

	user = await this.userRepo.findOne({
	  where: { username_42: property },
	  relations,
	});

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findAvatar(id: number): Promise<Avatar> {
    const user: User = await this.findOne(id, ['avatar']);
    if (!user.avatar)
      return null;

    return user.avatar;
  }

  async findMatches(id: number): Promise<Match[]> {
    const user = await this.findOne(id, ['won', 'lost']);

    let matches = [];
    if (user.won) matches = matches.concat(user.won);
    if (user.lost) matches = matches.concat(user.lost);

    return matches;
  }

  async findFollows(id: number): Promise<User[]> {
    const follows: User[] = [];
    const user: User = await this.findOne(id);

    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    user.follows.forEach(async (id) => {
      let f = await this.findOne(id);
      follows.push(f);
    });

    return follows;
  }

  async findBlocked(id: number): Promise<User[]> {
    const blocked: User[] = [];
    const user: User = await this.findOne(id);

    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    user.blocked.forEach(async (id) => {
      let b = await this.findOne(id);
      blocked.push(b);
    });

    return blocked;
  }

  async findStatus(id: number): Promise<Status> {
    const user: User = await this.findOne(id);

    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    return user.status;
  }

  /* ------------------------- UPDATE ------------------------ */

  async update(id: number, newUser: User): Promise<User> {
    // check for user  with id:id and null body
    if (!newUser) throw new HttpException('Body is null', HttpStatus.NOT_FOUND);
    await this.findOne(id);

    // check for modifiable updates
    const modifiable: Array<string> = [
      'first_name',
      'last_name',
      'username',
      'TFA_enabled',
      'TFA_secret',
    ];

    for (const key of Object.keys(newUser)) {
      if (modifiable.indexOf(key) == -1)
        throw new HttpException(
          'Value cannot be modified',
          HttpStatus.FORBIDDEN,
        );
    }

    // check for empty username
    if (newUser.username) {
      newUser.username = newUser.username.replace(/\s+/g, '');
      if (!newUser.username.length)
        throw new HttpException(
          'Username cannot be empty',
          HttpStatus.FORBIDDEN,
        );
    }

    // update user
    try {
      newUser.id = id;
      await this.userRepo.update(id, newUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    delete newUser.id;
    return newUser;
  }

  async updatePassword(
    id: number,
    oldPass: string,
    newPass: string,
  ): Promise<User> {
    let user: User = await this.findOne(id);

    if (!(await argon.verify(user.password, oldPass)))
      throw new HttpException('Old password mismatch!', HttpStatus.BAD_REQUEST);

    let result;
    try {
      let password = await argon.hash(newPass);
      result = await this.userRepo.update(id, { password });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async updateLevel(winner: User, loser: User): Promise<void> {
    try {
      await this.userRepo.update(winner.id, {
        rank: (winner.rank + 5 + Math.floor(loser.rank * 0.01)),
      });
      if (loser.rank - 5 - (winner.rank - loser.rank) * 0.01 > 0)
        await this.userRepo.update(loser.id, {
          rank: (loser.rank - 5 - Math.floor((winner.rank - loser.rank) * 0.01)),
        });
      else await this.userRepo.update(loser.id, { rank: 0 });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async setStatus(id: number, status: Status) {
    let user = await this.findOne(id);

    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    if (user.status == status) return;

    try {
      await this.userRepo.update(user.id, { status });
      this.notifyService.emitStatus(user.id, status);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async setAvatar(id: number, file: Express.Multer.File): Promise<void> {
    if (!file)
      throw new HttpException('File required', HttpStatus.NOT_ACCEPTABLE);

    const filename = file.originalname;
    const data = file.buffer;

    const user: User = await this.findOne(id, ['avatar']);

    await this.avatarService.create(filename, user, data);
    if (user.avatar) await this.avatarService.delete(user.avatar.id);
  }

  async toggleFollow(uid: number, tid: number): Promise<number[]> {
    if (uid === tid) return;

    const user = await this.findOne(uid);
    const target = await this.findOne(tid);

    let follows = user.follows;
    const index = follows.indexOf(target.id);

    if (index === -1) follows = [...follows, target.id];
    else follows = [...follows.slice(0, index), ...follows.slice(index + 1)];

    try {
      await this.userRepo.update(user.id, { follows: follows });
    } catch (error) {
      throw new Error(`Could not update user: ${error.message}`);
    }

    return follows;
  }

  async toggleBlock(uid: number, tid: number): Promise<number[]> {
    if (uid === tid) return;

    const user = await this.findOne(uid);
    const target = await this.findOne(tid);
    const index = user.blocked.indexOf(target.id);

    if (index === -1) user.blocked.push(target.id);
    else user.blocked.splice(index, 1);

    try {
      await this.userRepo.update(user.id, {
        blocked: user.blocked,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return user.blocked;
  }

  /* ------------------------- DELETE ------------------------- */

  async delete(id: number): Promise<User> {
    let user = await this.findOne(id);

    await this.userRepo.remove(user);
    return user;
  }
}
