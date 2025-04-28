import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Device } from '@/app/devices/devices.types';

export class FindAllDeviceResponseDto {
  constructor(
    devices: Device[],
    total: number,
    page: number,
    limit: number,
    totalPages: number
  ) {
    this.devices = devices;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = totalPages;
  }

  @IsNotEmpty()
  devices: Device[];

  @IsNumber()
  @IsPositive()
  total: number;

  @IsNumber()
  @IsPositive()
  page: number;

  @IsNumber()
  @IsPositive()
  limit: number;

  @IsNumber()
  @IsPositive()
  totalPages: number;
}
