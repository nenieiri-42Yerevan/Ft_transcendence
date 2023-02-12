import { User } from 'src/user/entities';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { GroupChat } from './group-chat.entity';

@Entity()
export class Banned {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  endOfBan: Date;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => GroupChat)
  @JoinColumn()
  group: GroupChat;
}
