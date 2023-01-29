import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
	imports: [
		UserModule,
		JwtModule.register({})
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
