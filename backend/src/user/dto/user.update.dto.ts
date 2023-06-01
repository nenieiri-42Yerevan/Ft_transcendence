import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Avatar, Match, Session, Status } from '../entities';
import { Chat } from 'src/chat/entities';
export type Gender = 'male' | 'female';

export class UserUpdateDto {
  @IsOptional()
  first_name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  username: string;

  @IsOptional()
  username_42: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  gender: Gender;

  @IsOptional()
  date_of_birth: Date;

  @IsOptional()
  rank: number;

  @IsOptional()
  status: Status;

  @IsOptional()
  TFA_enabled: boolean;

  @IsOptional()
  TFA_secret: string;

  @IsOptional()
  user_42: boolean;

  @IsOptional()
  created_at: Date;

  @IsOptional()
  follows: number[];

  @IsOptional()
  blocked: number[];

  @IsOptional()
  avatar: Avatar;

  @IsOptional()
  sessions: Session[];

  @IsOptional()
  won: Match[];

  @IsOptional()
  lost: Match[];

  @IsOptional()
  chats: Chat[];
}
