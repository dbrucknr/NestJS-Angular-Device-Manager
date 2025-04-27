import { ApiProperty } from '@nestjs/swagger';
import { DeviceResponseDto } from './device-response.dto';
import { PaginatedResponse } from '@modules/devices/interfaces/paginated-response.interface';

export class FindAllDeviceResponseDto
  implements PaginatedResponse<DeviceResponseDto>
{
  @ApiProperty({
    type: DeviceResponseDto,
    isArray: true,
    description: 'List of devices',
  })
  data: DeviceResponseDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;
}
