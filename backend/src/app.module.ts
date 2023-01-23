import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
		isGlobal: true,
		envFilePath: '../.env',
	}),
    DatabaseModule,
    UserModule,
	AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
