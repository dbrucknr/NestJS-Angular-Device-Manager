import { Device } from '@modules/devices/entities/device.entity';

export class DeviceUpdatedEvent {
  constructor(
    public message: string,
    public device: Device,
    public changes: Partial<Device>,
  ) {}
}
