import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from 'src/user/entities';

@Entity()
export class GroupChat extends Chat {
  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  public: boolean;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => User, (user) => user.createdGroups)
  @JoinColumn()
  owner: User;

  @Column('int', { array: true, default: [] })
  admins: number[];
}
