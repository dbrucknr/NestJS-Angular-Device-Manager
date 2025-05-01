import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@modules/auth/services/auth.service';
import { AuthController } from '@modules/auth/controllers/auth.controller';
import { AuthConfig } from '@modules/auth/config/auth.config';
import { ShibbolethStrategy } from '@modules/auth/strategies/shibboleth.strategy';
import { SessionSerializer } from '@modules/auth/serializers/session.serializer';
import { OPENIDCONNECT } from '@modules/auth/constants/auth.constants';

@Module({
  imports: [
    PassportModule.register({ session: true, defaultStrategy: OPENIDCONNECT }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthConfig, ShibbolethStrategy, SessionSerializer],
  exports: [ShibbolethStrategy, SessionSerializer],
})
export class AuthModule {}
