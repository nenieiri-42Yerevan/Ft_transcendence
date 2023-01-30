import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Avatar, Session } from './index';

export type Gender = 'male' | 'female';

export enum Status {
  OFFLIEN = 0,
  ONLIEN,
  GAME,
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

  @Column({ nullable: false, unique: true, length: 45 })
  email: string;

  @Column({ nullable: false, select: true })
  password: string;

  @Column({ type: 'enum', nullable: false, enum: ['male', 'female'] })
  gender: Gender;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ default: 0 })
  rank: number;

  @Column({ default: Status.OFFLIEN })
  status: Status;

  @CreateDateColumn({ default: () => 'NOW()' })
  created_at: Date;

  @OneToOne(() => Avatar, (avatar) => avatar.user)
  avatar: Avatar;

  @OneToOne(() => Session, (session) => session.owner)
  session: Session;
}
