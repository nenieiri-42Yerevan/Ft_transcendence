import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (env: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5434,
        username: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_NAME'),
        entities: [],
        synchronize: true, // false for production
      }),
    }),
  ],
})
export class DatabaseModule {}
