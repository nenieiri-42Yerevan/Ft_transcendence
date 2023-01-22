import { Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from '../dto';
import { DataSource } from 'typeorm';
import * as argon from 'argon2';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AuthService {
  // creatinhg user sessions and jwt tokens
  signin() {}

  // Dealing with 42 login
}
