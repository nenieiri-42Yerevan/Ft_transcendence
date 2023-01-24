import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type Gender = 'male' | 'female';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: false, unique: true, length: 45 })
  username: string;

  @Column({ nullable: false, unique: true, length: 45 })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', nullable: false, enum: ['male', 'female'] })
  gender: Gender;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @CreateDateColumn({ default: () => 'NOW()' })
  created_at: Date;

  @Column({ default: 0 })
  level: number;
}
