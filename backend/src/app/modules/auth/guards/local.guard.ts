import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name);
  async canActivate(context: ExecutionContext) {
    this.logger.log('LocalAuthGuard activated');
    const result = (await super.canActivate(context)) as boolean;
    this.logger.log('LocalAuthGuard canActivate result:', result);
    const request = context.switchToHttp().getRequest<Request>();
    await super.logIn(request);
    return result;
  }
}
