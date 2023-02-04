import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendController } from './controllers/friend.controller';
import { UserController } from './controllers/user.controller';
import { User, Avatar, Session, Match, FriendRequest } from './entities';
import { AvatarService } from './services/avatar.service';
import { FriendRequestService } from './services/friend.service';
import { MatchService } from './services/match.service';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Avatar, Session, Match, FriendRequest]),
  ],
  controllers: [UserController, FriendController],
  providers: [
    UserService,
    AvatarService,
    SessionService,
    MatchService,
    FriendRequestService,
  ],
  exports: [UserService, SessionService],
})
export class UserModule {}
