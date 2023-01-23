import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos';

@Injectable()
export class AuthService {
  // creatinhg user sessions and jwt tokens
  signin(dto: SignInDto) {}

  // Dealing with 42 login
}
