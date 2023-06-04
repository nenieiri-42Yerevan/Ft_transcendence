import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from 'src/user/entities';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  users: User[];

  @OneToMany(() => Message, (message) => message.chat, { eager: true })
  messages: Message[];
}
