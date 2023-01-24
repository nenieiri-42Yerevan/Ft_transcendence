import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export default class Avatar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({ type: 'bytea' })
  data: Buffer;

  @ManyToOne(() => User, (user) => user.avatar, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
