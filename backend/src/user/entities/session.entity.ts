import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true })
  refresh_token: string;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  @JoinColumn()
  owner: User;
}
