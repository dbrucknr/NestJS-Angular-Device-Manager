// Third Party Dependencies
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, EntityNotFoundError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
// Local Dependencies
import { Device } from '@modules/devices/entities/device.entity';
import { CreateDeviceDto } from '@modules/devices/dto/create-device.dto';
import { UpdateDeviceDto } from '@modules/devices/dto/update-device.dto';
import { PaginationQueryDto } from '@modules/devices/dto/pagination-query.dto';
import { DeviceUpdatedEvent } from '@modules/devices/dto/device-updated-event.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
    private eventEmitter: EventEmitter2,
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    const device = this.devicesRepository.create(createDeviceDto);
    return this.devicesRepository.save(device);
  }

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQueryDto;

    const [devices, total] = await this.devicesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      devices,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Device> {
    const device = await this.devicesRepository.findOne({ where: { id } });
    if (!device) {
      console.log('********** Device not found **********');
      console.log(`Device with ID ${id} not found`);
      throw new EntityNotFoundError(Device, id); // Make use of Global Exception Handler
      // throw new NotFoundException(`Device with ID ${id} not found`);
    }
    return device;
  }

  async update(id: number, attributes: Partial<Device>): Promise<Device> {
    // 1. Find the device
    const device = await this.findOne(id);
    // 2. Record the attempted changes
    this.eventEmitter.emit(
      'device.updated',
      new DeviceUpdatedEvent('Device updated', device, attributes),
    );
    // 3. Update the device with the new attributes
    Object.assign(device, attributes);
    // 4. Save the device
    return this.devicesRepository.save(device);
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
