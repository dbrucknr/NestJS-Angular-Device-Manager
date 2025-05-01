import { Injectable } from '@nestjs/common';
import { StrategyOptions } from 'passport-openidconnect';
import { load } from 'ts-dotenv';
import { AuthEnv, schema } from '@modules/auth/interfaces/auth.interfaces';

@Injectable()
export class AuthConfig {
  private readonly env: AuthEnv;
  constructor() {
    this.env = load(schema);
  }

  get config(): StrategyOptions {
    return {
      issuer: this.env.ISSUER_BASE_URL,
      authorizationURL: this.env.AUTHORIZATION_URL,
      tokenURL: this.env.TOKEN_URL,
      userInfoURL: this.env.USER_INFO_URL,
      callbackURL: this.env.CALLBACK_URL,
      clientID: this.env.CLIENT_ID,
      clientSecret: this.env.CLIENT_SECRET,
      scope: this.env.SCOPE,
    };
  }
}
