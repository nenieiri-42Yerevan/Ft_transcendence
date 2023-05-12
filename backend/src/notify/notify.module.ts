import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { NotifyGateway } from './notify.gateway';
import { NotifyService } from './notify.service';

@Module({
  imports: [UserModule, AuthModule],
  providers: [NotifyService, NotifyGateway],
  exports: [NotifyService, NotifyGateway],
})
export class NotifyModule {}
