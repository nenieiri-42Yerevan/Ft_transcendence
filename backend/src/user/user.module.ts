import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User, Avatar, Session, Match } from './entities';
import { AvatarService } from './services/avatar.service';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Avatar, Session, Match])],
  controllers: [UserController],
  providers: [UserService, AvatarService, SessionService],
  exports: [UserService, SessionService],
})
export class UserModule {}
