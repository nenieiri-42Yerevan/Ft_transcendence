import { User } from 'src/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { GroupChat } from './group-chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  author: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn()
  chat: Chat;

  @ManyToOne(() => GroupChat, (gchat) => gchat.messages)
  @JoinColumn()
  gchat: GroupChat;
}
