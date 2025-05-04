import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { OPENIDCONNECT } from '@modules/auth/constants/auth.constants';

// I need to check if this pattern actually works
// https://dev.to/nestjs/setting-up-sessions-with-nestjs-passport-and-redis-210
// Lets re-think this approach
@Injectable()
export class ShibbolethGuard extends AuthGuard(OPENIDCONNECT) {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest<Request>();
    await super.logIn(request);
    return result;
  }
}
