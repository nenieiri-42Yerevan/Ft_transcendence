import { IsNotEmpty } from 'class-validator';

export class SignInTFAwith42Dto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  TFA: string;
}
