import { IsEmail, IsNotEmpty } from 'class-validator';

export type Gender = 'male' | 'female';

export class UserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  date_of_birth: Date;
}
