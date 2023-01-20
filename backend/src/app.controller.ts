import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  @Get('/transcendence')
  welcome(): string {
    return 'Welcome page';
  }
}
