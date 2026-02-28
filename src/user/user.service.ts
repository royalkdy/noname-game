import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '@/common/error-code';
import { PrismaService } from '@/common/prisma/prisma.service';
import { OAuthPayload } from '@/auth/types/auth.types';
import { UserStatus, OAuthProvider } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(id: number) {
    const user = await this.prisma.userAccount.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        status: true,
      },
    });

    if (!user) {
      throw new HttpException(ErrorCode.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.userAccount.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        status: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findUserWithPasswordByEmail(email: string) {
    const user = await this.prisma.userAccount.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        status: true,
        password: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async createLocalUser(email: string, password: string) {
    const user = await this.prisma.userAccount.create({
      data: {
        email,
        password,
      },
      select: {
        id: true,
        email: true,
        status: true,
      },
    });
    return user;
  }

  async findByOAuth(provider: OAuthProvider, providerUserId: string) {
    return await this.prisma.oAuthAccount.findUnique({
      where: {
        provider_providerUserId: {
          provider: provider,
          providerUserId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            status: true,
          },
        },
      },
    });
  }

  async createOAuthUser(data: OAuthPayload) {
    return await this.prisma.userAccount.create({
      data: {
        email: data.email,
        // OAuth는 이메일 인증이 불필요 바로 활성화
        status: UserStatus.ACTIVE,
        oauths: {
          create: {
            provider: data.provider,
            providerUserId: data.providerUserId,
          },
        },
      },
    });
  }
}
