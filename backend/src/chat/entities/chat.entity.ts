import { User } from 'src/user/entities';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
@TableInheritance()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, { onDelete: 'CASCADE' })
  @JoinTable()
  users: User[];

  @OneToMany(() => Message, (message) => message.chat, { eager: true })
  messages: Message[];
}
