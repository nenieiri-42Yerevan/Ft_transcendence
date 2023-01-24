import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // generating and returning JSON Web Token
  generateJWT() {}

  // verifying JSON Web Token
  verifyJWT() {}

  // creatinhg user sessions and connection
  login() {}

  // perform the authorization
  getUserFromSocket() {}
}
