import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ChatModule } from './chat/chat.module';
import { NotifyModule } from './notify/notify.module';
import { GameModule } from './game/game.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    PassportModule.register({ defaultStrategy: '42' }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ChatModule,
    NotifyModule,
    GameModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AtGuard}],
})
export class AppModule {}
