import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [],
  providers: [SessionSerializer],
})
export class AuthModule {}
