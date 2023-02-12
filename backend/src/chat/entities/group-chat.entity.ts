import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/entities';
import { Muted } from './muted.entity';
import { Banned } from './banned.entity';
import { Chat } from './chat.entity';

@Entity()
export class GroupChat extends Chat {
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

  @OneToMany(() => Muted, (muted) => muted.group, { eager: true })
  muted: Muted[];

  @OneToMany(() => Banned, (banned) => banned.group, { eager: true })
  banned: Banned[];
}
