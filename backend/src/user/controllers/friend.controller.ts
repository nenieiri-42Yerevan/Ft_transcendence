import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  FriendRequest,
  FriendRequestStatus,
  RequestStatus,
  User,
} from '../entities';
import { FriendRequestService } from '../services/friend.service';

@Controller('friend-request')
export class FriendController {
  constructor(private friendRequestService: FriendRequestService) {}

  @Post('/send/:receiverId')
  async sendFriendRequest(
    @Param('receiverId') receiverStringId: string,
    @Body() creator: User,
  ): Promise<FriendRequest | { error: string }> {
    const receiverId = parseInt(receiverStringId);
    return await this.friendRequestService.sendFriendRequest(
      receiverId,
      creator,
    );
  }

  @Get('status/:receiverId')
  getFriendRequestStatus(
    @Param('receiverId') receiverStringId: string,
    @Body() current: User,
  ): Observable<FriendRequestStatus> {
    const receiverId = parseInt(receiverStringId);
    return this.friendRequestService.getFriendRequestStatus(
      receiverId,
      current,
    );
  }

  @Put('/response/:friendRequestId')
  respondToFriendRequest(
    @Param('friendRequestId') friendRequestStringId: string,
    @Body() status: RequestStatus,
  ): Observable<FriendRequestStatus> {
    const friendRequestId = parseInt(friendRequestStringId);
    return this.friendRequestService.respondToFriendRequest(
      status,
      friendRequestId,
    );
  }
}
