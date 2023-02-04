import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export type RequestStatus =
  | 'not-sent'
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'blocked';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.createdRequests)
  creator: User;

  @ManyToOne(() => User, (user) => user.recievedRequests)
  reciever: User;

  @Column({ type: 'enum', nullable: true })
  status: RequestStatus;
}
