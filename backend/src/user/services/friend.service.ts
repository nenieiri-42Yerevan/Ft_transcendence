import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { User, FriendRequest } from '../entities';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly requestRepo: Repository<FriendRequest>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  /* CHECKS */

  hasRequestBeenSentOrReceived(
    creator: User,
    receiver: User,
    id: number,
  ): Observable<boolean> {
    return from(
      this.requestRepo.findOne({
        where: [
          { creator: { id: creator.id }, receiver: { id: receiver.id } },
          { creator: { id: receiver.id }, receiver: { id: creator.id } },
        ],
      }),
    ).pipe(
      switchMap((friendRequest: FriendRequest) => {
        if (!friendRequest) return of(false);
        return of(true);
      }),
    );
  }
}
