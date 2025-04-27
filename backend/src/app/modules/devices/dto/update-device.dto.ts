import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsEnum } from 'class-validator';
import { CreateDeviceDto } from '@modules/devices/dto/create-device.dto';
import { ApiProperty } from '@nestjs/swagger';
import { DeviceStatus } from '@modules/devices/entities/device.entity';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  // Perhaps this value shouldn't be allowed to be changed
  @ApiProperty({
    description: 'Serial number of the device',
    example: 'SN1234567890',
    required: false,
  })
  @IsOptional()
  serialNumber: string;

  // Perhaps this value shouldn't be allowed to be changed
  @ApiProperty({
    description: 'MAC address of the device',
    example: '00:1A:2B:3C:4D:5E',
    required: false,
  })
  @IsOptional()
  macAddress: string;

  // Perhaps this value shouldn't be allowed to be changed
  @ApiProperty({
    description: 'The platform of the device',
    example: 'Cisco Catalyst 9300',
    required: false,
  })
  @IsOptional()
  platform: string;

  @ApiProperty({
    description: 'Version of the device OS',
    example: '1.0.0',
    required: false,
  })
  @IsOptional()
  osVersion: string;

  @IsOptional()
  @IsEnum(DeviceStatus)
  @ApiProperty({
    description: 'The status of the device',
    enum: DeviceStatus,
    enumName: 'DeviceStatus',
    example: DeviceStatus.STANDBY,
    required: false,
  })
  status: DeviceStatus;
}
