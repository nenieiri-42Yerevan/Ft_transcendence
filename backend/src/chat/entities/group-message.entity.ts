import { User } from 'src/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupChat } from './group-chat.entity';

@Entity()
export class GroupMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  author: User;

  @ManyToOne(() => GroupChat, (gchat) => gchat.messages)
  @JoinColumn()
  gchat: GroupChat;
}
