import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities';
import { Muted } from './muted.entity';
import { Banned } from './banned.entity';
import { GroupMessage } from './group-message.entity';

@Entity()
export class GroupChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  public: boolean;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  owner: User;

  @Column('int', { array: true, default: [] })
  admins: number[];

  @OneToMany(() => Muted, (muted) => muted.group, {
    onDelete: 'CASCADE',
    eager: true,
  })
  muted: Muted[];

  @OneToMany(() => Banned, (banned) => banned.group, {
    onDelete: 'CASCADE',
    eager: true,
  })
  banned: Banned[];

  @ManyToMany(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  users: User[];

  @OneToMany(() => GroupMessage, (message) => message.gchat, {
    onDelete: 'CASCADE',
    eager: true,
  })
  messages: GroupMessage[];
}
