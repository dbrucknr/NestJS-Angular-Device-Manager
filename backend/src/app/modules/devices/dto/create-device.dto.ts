import { IsMACAddress, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { DeviceStatus } from '../entities/device.entity';

export class CreateDeviceDto {
  @ApiProperty()
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty()
  @IsMACAddress()
  macAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  platform: string;

  @ApiProperty()
  @IsNotEmpty()
  osVersion: string;

  // @ApiProperty({
  //   description: 'The status of the device',
  // })
  // @IsOptional()
  // status: DeviceStatus;
}
