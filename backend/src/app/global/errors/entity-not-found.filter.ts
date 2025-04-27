import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundResponseDto } from '@/app/global/dto/entity-not-found.dto';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    // Extract Intercepted Context
    const ctx = host.switchToHttp();
    // Extract the Response from Intercepted Context
    const response = ctx.getResponse<Response>();
    // Build a DTO for the Error Response
    const dto = new EntityNotFoundResponseDto(
      HttpStatus.NOT_FOUND,
      new Date().toISOString(),
      exception.message,
    );
    // Convert the validated DTO to a plain object
    const payload = instanceToPlain(dto);
    // Send the response with the validated payload
    response.status(HttpStatus.NOT_FOUND).json(payload);
  }
}
