import {
  Catch,
  ExceptionFilter,
  UnauthorizedException,
  ForbiddenException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import type { Response, Request } from 'express';

@Catch(UnauthorizedException, ForbiddenException)
export class UnauthorizedFilter implements ExceptionFilter {
  private readonly logger = new Logger(UnauthorizedFilter.name);

  catch(
    exception: UnauthorizedException | ForbiddenException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    // Log the unauthorized access attempt (consider checking the session or user)
    this.logger.warn(
      `Unauthorized access attempt to ${request.url} from ${request.ip}`,
    );

    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: 'Unauthorized',
      redirectUrl: 'http://localhost:3000/api/v1/auth', // Make Constant
    });
  }
}
