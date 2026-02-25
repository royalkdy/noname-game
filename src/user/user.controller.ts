import {
  Controller,
  Get,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ErrorCode } from '../common/error-code';
// import { prisma } from '@/lib/prisma';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedGuard } from '@/auth/guard/auth.guard';

@UseGuards(AuthenticatedGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('/getUserInfo')
  getUserInfo() {
    throw new BadRequestException(ErrorCode.USER_ALREADY_EXISTS);
  }
}
