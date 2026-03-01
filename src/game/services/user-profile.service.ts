import { Injectable, BadRequestException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import {
  CreateUserProfileRequestDto,
  CreateUserProfileResponseDto,
} from '../dto/user-profile.dto';
import {
  GameAction,
  GameRequest,
  GameResponse,
} from '../dispatcher/game-action.types';
import { GameDispatcher } from '../dispatcher/game.dispatcher';

@Injectable()
export class UserProfileService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dispatcher: GameDispatcher,
  ) {}

  onModuleInit() {
    this.dispatcher.register(
      GameAction.CREATE_USER_PROFILE,
      this.createUserProfile,
    );
  }

  createUserProfile = async (
    payload: GameRequest<GameAction.CREATE_USER_PROFILE>,
  ): Promise<GameResponse<GameAction.CREATE_USER_PROFILE>> => {
    // 닉네임 중복 확인
    const nicknameExists = await this.prisma.userProfile.findUnique({
      where: { nickname: payload.nickname },
    });

    if (nicknameExists) {
      throw new BadRequestException('NICKNAME_ALREADY_EXISTS');
    }

    return this.prisma.userProfile.create({
      data: {
        id: payload.userId,
        nickname: payload.nickname,
      },
    });
  };
}
