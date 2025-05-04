import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, VerifyCallback, Profile } from 'passport-openidconnect';
import { AuthConfig } from '@modules/auth/config/auth.config';
import { OPENIDCONNECT } from '@modules/auth/constants/auth.constants';

@Injectable()
export class ShibbolethStrategy extends PassportStrategy(
  Strategy,
  OPENIDCONNECT,
) {
  constructor(private readonly authConfig: AuthConfig) {
    super({
      ...authConfig.config,
    });
  }

  validate(issuer: string, profile: Profile, verify: VerifyCallback) {
    return verify(null, profile, {
      message: 'User authenticated successfully',
      issuer,
      profile,
    });
  }
}
