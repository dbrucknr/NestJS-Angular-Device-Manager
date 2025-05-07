import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@modules/auth/services/auth.service';
import { LocalAuthController } from '@modules/auth/controllers/local-auth.controller';
import { ShibbolethAuthController } from '@modules/auth/controllers/shibboleth-auth.controller';
import { AuthConfig } from '@modules/auth/config/auth.config';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { ShibbolethStrategy } from '@modules/auth/strategies/shibboleth.strategy';
import { SessionSerializer } from '@modules/auth/serializers/session.serializer';
import { jwtConstants } from '@modules/auth/constants/auth.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule.register({ session: true }),
  ],
  controllers: [ShibbolethAuthController, LocalAuthController],
  providers: [
    AuthService,
    AuthConfig,
    LocalStrategy,
    ShibbolethStrategy,
    SessionSerializer,
  ],
  exports: [ShibbolethStrategy, SessionSerializer],
})
export class AuthModule {}
