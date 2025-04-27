import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '@modules/devices/entities/device.entity';
import { DeviceChangelog } from '@modules/devices/entities/device-changelog.entity';
import { DevicesService } from '@modules/devices/services/devices.service';
import { DevicesController } from '@modules/devices/controllers/devices.controller';
import { DeviceFixtures } from '@modules/devices/fixtures/device.fixtures';
import { DeviceUpdatedListener } from '@modules/devices/events/device-updated.listener';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService, DeviceFixtures, DeviceUpdatedListener],
  imports: [TypeOrmModule.forFeature([Device, DeviceChangelog])],
  exports: [DeviceFixtures],
})
export class DevicesModule {}
