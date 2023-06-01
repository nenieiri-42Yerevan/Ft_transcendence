import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export type Gender = 'male' | 'female';

export class UserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  username: string;

  @IsOptional()
  username_42: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  gender: Gender;

  @IsOptional()
  date_of_birth: Date;

  @IsOptional()
  user_42: boolean;
}
