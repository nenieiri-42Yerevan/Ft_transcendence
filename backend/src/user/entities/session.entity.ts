import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => User, (user) => user.session, { onDelete: 'CASCADE' })
  @JoinColumn()
  owner: User;
}
