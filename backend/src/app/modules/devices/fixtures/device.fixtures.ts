import { Repository } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from '@modules/devices/entities/device.entity';
import { CreateDeviceDto } from '@modules/devices/dto/create-device.dto';

/**
 * DeviceFixtures
 * @description Generates random device data for development purposes.
 * @class
 */
@Injectable()
export class DeviceFixtures {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<Device>} devicesRepository
   */
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
  ) {}

  private platforms = [
    'Cisco Catalyst 9300',
    'Cisco Nexus 93180YC-FX',
    'Juniper EX3400',
    'Arista 7050X4-48',
    'HP Aruba 2930F',
    'Brocade ICX 7450',
    'Dell N3048',
    'MikroTik CRS328-24P-4S',
    'Ubiquiti UniFi Switch 48',
    'Huawei S5720-28X-LI-AC',
  ] as const;

  private osVersions = {
    'Cisco Catalyst 9300': ['IOS XE 17.3.3', 'IOS XE 17.6.1', 'IOS XE 17.9.1'],
    'Cisco Nexus 93180YC-FX': ['NX-OS 9.3(7)', 'NX-OS 9.3(9)', 'NX-OS 9.2(6)'],
    'Juniper EX3400': ['Junos 18.4R3', 'Junos 19.2R1', 'Junos 20.1R1'],
    'Arista 7050X4-48': ['EOS 4.25.1F', 'EOS 4.27.1F', 'EOS 4.23.1F'],
    'HP Aruba 2930F': ['ArubaOS 16.08.0005', 'ArubaOS 16.10.0012'],
    'Brocade ICX 7450': ['Fabric OS 08.0.20bT062', 'Fabric OS 08.1.10bT170'],
    'Dell N3048': ['FTOS 9.11(3)', 'FTOS 9.12(1)'],
    'MikroTik CRS328-24P-4S': ['RouterOS 6.47.9', 'RouterOS 6.48.4'],
    'Ubiquiti UniFi Switch 48': ['UniFi OS 7.2.23', 'UniFi OS 7.3.18'],
    'Huawei S5720-28X-LI-AC': ['VRP 8.180', 'VRP 8.190'],
  } as const satisfies Record<(typeof this.platforms)[number], string[]>;

  // const bleh2 = this.plat

  /** Helper: random int in [0, max) */
  private randInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  /** Helper: generate 4‑4‑4 alphanumeric serial */
  private makeSerial() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const part = () =>
      Array.from({ length: 4 }, () => chars[this.randInt(chars.length)]).join(
        '',
      );
    return `${part()}-${part()}-${part()}`;
  }

  /** Helper: generate MAC like AA:BB:1F:2C:3D:4E */
  private makeMac() {
    const hex = '0123456789ABCDEF';
    const byte = () => hex[this.randInt(16)] + hex[this.randInt(16)];
    return Array.from({ length: 6 }, () => byte()).join(':');
  }

  /**
   * Build raw DTO objects
   */
  private buildRawDtos(count: number): Omit<CreateDeviceDto, 'constructor'>[] {
    return Array.from({ length: count }, () => {
      const platform = this.platforms[this.randInt(this.platforms.length)];
      const versions = this.osVersions[platform];
      return {
        serialNumber: this.makeSerial(),
        macAddress: this.makeMac(),
        platform,
        osVersion: versions[this.randInt(versions.length)],
        // status: undefined
      };
    });
  }

  /**
   * Generate, validate, and insert N DTOs in bulk.
   */
  async persist(count = 500) {
    // TODO: Build a check to see if the database is empty before inserting
    const existing = await this.devicesRepository.count();
    if (existing > 0) return { inserted: 0 };

    // 1) build raw objects
    const raws = this.buildRawDtos(count);

    // 2) transform into actual DTO instances
    const dtos = plainToInstance(CreateDeviceDto, raws);

    // 3) (optional) validate every DTO
    await Promise.all(dtos.map((dto) => validateOrReject(dto)));

    // 4) bulk-insert; skips the extra "select by id" that causes NaN
    await this.devicesRepository.insert(raws);

    return { inserted: count };
  }
}
