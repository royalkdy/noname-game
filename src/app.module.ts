import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { RedisModule } from '@/common/redis/redis.module';

import { UserModule } from './user/user.module';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';

import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RedisModule,
    CommonModule,
    UserModule,
    AuthModule,
    GameModule,
    AdminModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
