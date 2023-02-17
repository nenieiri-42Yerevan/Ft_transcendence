import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities';
import { GroupChat } from './group-chat.entity';

@Entity()
export class Muted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  endOfMute: Date;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => GroupChat)
  @JoinColumn()
  group: GroupChat;
}
