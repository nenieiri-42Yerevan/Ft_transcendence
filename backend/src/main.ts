import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('transcendence');

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(7000);
}

bootstrap();
