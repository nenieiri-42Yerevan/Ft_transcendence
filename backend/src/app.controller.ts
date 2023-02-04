import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from './common/decorators';

@Public()
@Controller()
export class AppController {
  @Get('/transcendence')
  welcome(): string {
    return 'Welcome page';
  }
}
