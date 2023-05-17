import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifyService } from 'src/notify/notify.service';
import { UserController } from './controllers/user.controller';
import { User, Avatar, Session, Match } from './entities';
import { AvatarService } from './services/avatar.service';
import { MatchService } from './services/match.service';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';

let entities = [User, Avatar, Session, Match];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [UserController],
  providers: [
    UserService,
    AvatarService,
    SessionService,
    MatchService,
    NotifyService,
  ],
  exports: [UserService, SessionService, MatchService],
})
export class UserModule {}
