import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  providers: [UserService, AvatarService, SessionService, MatchService],
  exports: [UserService, SessionService],
})
export class UserModule {}
