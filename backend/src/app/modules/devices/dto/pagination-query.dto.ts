import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

// Should likely be moved to a 'global' or 'shared' directory once
// used in multiple modules
export class PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: 10,
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number = 10;
}
