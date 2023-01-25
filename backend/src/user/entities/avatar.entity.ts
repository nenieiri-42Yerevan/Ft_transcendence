import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file: string;

  @Column({ type: 'bytea' })
  data: Buffer;

  @ManyToOne(() => User, (user) => user.avatar, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
