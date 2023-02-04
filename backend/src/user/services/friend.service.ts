import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
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

  /* CREATE */

  async sendFriendRequest(
    receiverId: number,
    creator: User,
  ): Promise<FriendRequest | { error: string }> {
    if (receiverId === creator.id)
      throw new HttpException(
        'It is not possible to add yourself as afriend!',
        HttpStatus.BAD_REQUEST,
      );

    try {
      const receiver = await this.userRepo.findOne({
        where: { id: receiverId },
      });
      const req = this.hasRequestBeenSentOrReceived(creator, receiver);

      if (req) {
        throw new HttpException(
          'A friend request has already been sent or received to your account!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const friendRequest = {
        creator,
        receiver,
        status: 'pending',
      } as FriendRequest;

      await this.requestRepo.save(friendRequest);
      return friendRequest;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
