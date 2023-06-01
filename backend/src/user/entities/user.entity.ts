import { Chat } from 'src/chat/entities/chat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Avatar, Session, Match } from './index';

export type Gender = 'male' | 'female';

export enum Status {
  OFFLINE = 0,
  ONLINE,
  GAME,
  CHAT,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: false, unique: true, length: 45 })
  username: string;

  @Column({ nullable: true, length: 45, default: null })
  username_42: string;

  @Column({ nullable: false, unique: true, length: 45 })
  email: string;

  @Column({ nullable: false, select: true })
  password: string;

  @Column({ type: 'enum', nullable: true, enum: ['male', 'female'] })
  gender: Gender;

  @Column({ type: 'timestamptz', nullable: true })
  date_of_birth: Date;

  @Column({ default: 0 })
  rank: number;

  @Column({ default: Status.OFFLINE })
  status: Status;

  @Column({ default: false })
  TFA_enabled: boolean;

  @Column({ default: false })
  user_42: boolean;

  @Column({ default: null })
  TFA_secret: string;

  @CreateDateColumn({ default: () => 'NOW()' })
  created_at: Date;

  @Column('int', { array: true, default: [] })
  follows: number[];

  @Column('int', { array: true, default: [] })
  blocked: number[];

  @OneToOne(() => Avatar, (avatar) => avatar.user)
  avatar: Avatar;

  @OneToMany(() => Session, (session) => session.owner)
  sessions: Session[];

  @OneToMany(() => Match, (match) => match.winner)
  won: Match[];

  @OneToMany(() => Match, (match) => match.loser)
  lost: Match[];

  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];
}
