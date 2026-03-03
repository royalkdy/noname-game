import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import {
  GameAction,
  GameRequest,
  GameResponse,
} from '../dispatcher/game.contract';

@Injectable()
export class UserProfileService {
  constructor(private readonly prisma: PrismaService) {}

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
