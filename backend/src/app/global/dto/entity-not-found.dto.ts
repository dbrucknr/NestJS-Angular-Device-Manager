import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class EntityNotFoundResponseDto {
  constructor(
    statusCode: HttpStatus.NOT_FOUND,
    timestamp: string,
    message: string,
  ) {
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.message = message;
  }

  @ApiProperty({ example: 404, description: 'HTTP status code' })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  statusCode: HttpStatus.NOT_FOUND;

  @ApiProperty({
    example: '2025-04-23T14:32:17.123Z',
    description: 'ISO 8601 timestamp of the error',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @ApiProperty({
    example: 'Entity with ID 123 not found',
    description: 'Error message',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  message: string;
}
