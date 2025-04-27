import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceChangelog } from '@modules/devices/entities/device-changelog.entity';
import { DeviceUpdatedEvent } from '@modules/devices/dto/device-updated-event.dto';

/**
 * Event listener for device updates.
 * This listener is triggered when a device is updated and tracks the changes
 * to the device changelog database table.
 */
@Injectable()
export class DeviceUpdatedListener {
  constructor(
    @InjectRepository(DeviceChangelog)
    private deviceChangelogRepository: Repository<DeviceChangelog>,
  ) {}

  @OnEvent('device.updated')
  async handleDeviceUpdatedEvent(payload: DeviceUpdatedEvent) {
    // Generate a Changelog Validated Entity
    const changelog = this.deviceChangelogRepository.create({
      device: { id: payload.device.id },
      previousAttributes: JSON.stringify(payload.device),
      changedAttributes: JSON.stringify(payload.changes),
    });
    // Save the Changelog to the database
    await this.deviceChangelogRepository.save(changelog);
  }
}
