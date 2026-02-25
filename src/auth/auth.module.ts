import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  controllers: [],
  providers: [SessionSerializer],
})
export class AuthModule {}
