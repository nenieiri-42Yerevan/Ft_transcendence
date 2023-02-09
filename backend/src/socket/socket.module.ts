import { Module } from '@nestjs/common';
import { Socket } from 'dgram';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { SocketService } from './socket.service';

@Module({
  imports: [UserModule, AuthModule],
  providers: [SocketService],
})
export class SocketModule {}
