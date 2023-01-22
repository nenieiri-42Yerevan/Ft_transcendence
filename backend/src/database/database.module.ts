import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

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
        entities: [User],
        synchronize: true, // false for production
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
