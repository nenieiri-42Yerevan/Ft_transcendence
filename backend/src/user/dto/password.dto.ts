import { IsNotEmpty } from 'class-validator';

export class PasswordDto {
  @IsNotEmpty()
  old: string;

  @IsNotEmpty()
  current: string;
}
