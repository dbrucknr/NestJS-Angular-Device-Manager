import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Request } from 'express';

// I think this can be moved into a global guard
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    return request.isAuthenticated();
  }
}
