import { ApiProperty } from '@nestjs/swagger';

export class DeviceResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the device',
    example: '42',
  })
  id: string;

  @ApiProperty({
    description: 'Device Serial Number',
    example: 'SN123456789',
  })
  serialNumber: string;

  @ApiProperty({
    description: 'MAC address of the device',
    example: '00:1A:2B:3C:4D:5E',
  })
  macAddress: string;

  @ApiProperty({
    description: 'The platform of the device',
    example: 'Cisco Catalyst 9300',
  })
  platform: string;

  @ApiProperty({
    description: 'Version of the device OS',
    example: '1.0.0',
  })
  osVersion: string;
}
