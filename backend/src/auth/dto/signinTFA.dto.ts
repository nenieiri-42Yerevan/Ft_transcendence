import { IsNotEmpty } from 'class-validator';

export class SignInTFADto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  TFA: string;
}
