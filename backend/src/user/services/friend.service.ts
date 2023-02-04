import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of, switchMap } from 'rxjs';
import { Not, Repository } from 'typeorm';
import {
  User,
  FriendRequest,
  RequestStatus,
  FriendRequestStatus,
} from '../entities';

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
    const friendRequest = this.requestRepo.findOne({
      where: [
        { creator: { id: creator.id }, receiver: { id: receiver.id } },
        { creator: { id: receiver.id }, receiver: { id: creator.id } },
      ],
    });

    return from(friendRequest).pipe(
      switchMap((friendRequest: FriendRequest) => {
        return friendRequest ? of(true) : of(false);
      }),
    );
  }

  isUserBlocked(creator: User, receiver: User): Observable<boolean> {
    const friendRequest = this.requestRepo.findOne({
      where: [
        {
          creator: { id: creator.id },
          receiver: { id: receiver.id },
          status: 'blocked',
        },
      ],
    });

    return from(friendRequest).pipe(
      switchMap((friendRequest: FriendRequest) => {
        return friendRequest ? of(true) : of(false);
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

  /* READ */

  getFriendRequestStatus(
    receiverId: number,
    currentUser: User,
  ): Observable<FriendRequestStatus> {
    const receiver = from(this.userRepo.findOne({ where: { id: receiverId } }));

    return receiver.pipe(
      switchMap((receiver: User) => {
        return from(
          this.requestRepo.findOne({
            where: [
              {
                creator: { id: currentUser.id },
                receiver: { id: receiver.id },
                status: Not('blocked'),
              },
              {
                creator: { id: receiver.id },
                receiver: { id: currentUser.id },
              },
            ],
            relations: ['creator', 'receiver'],
          }),
        );
      }),
      switchMap((friendRequest: FriendRequest) => {
        if (
          friendRequest?.receiver.id === currentUser.id &&
          friendRequest.status == 'pending'
        ) {
          return of({
            id: friendRequest?.id,
            status: 'waiting-for-current-user-response' as RequestStatus,
          });
        }
        return of({
          id: friendRequest?.id,
          status: friendRequest?.status || 'not-sent',
        });
      }),
    );
  }

  /* RESPOND */

  respondToFriendRequest(
    status: RequestStatus,
    requestId: number,
  ): Observable<FriendRequestStatus> {
    const friendRequest = from(
      this.requestRepo.findOne({
        where: { id: requestId },
      }),
    );

    return friendRequest.pipe(
      switchMap((friendRequest: FriendRequest) => {
        return from(
          this.requestRepo.save({
            ...friendRequest,
            status: status,
          }),
        );
      }),
    );
  }
}
