import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from 'src/user/entities';
import { Muted } from './muted.entity';
import { Banned } from './banned.entity';

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

  @OneToMany(() => Muted, (muted) => muted.group, { eager: true })
  muted: Muted[];

  @OneToMany(() => Banned, (banned) => banned.group, { eager: true })
  banned: Banned[];
}
