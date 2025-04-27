import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { DeviceChangelog } from '@modules/devices/entities/device-changelog.entity';

// export enum LifecycleStatus {
//   INVENTORY = 'inventory',
//   INSTALLED = 'installed',
//   RETIRED = 'retired',
// }

// export enum OperationalStatus {
//   ACTIVE = 'active',
//   FAULTY = 'faulty',
//   LOST = 'lost',
// }

export enum DeviceStatus {
  INSTALLED = 'installed',
  RETIRED = 'retired',
  RMA = 'rma',
  STANDBY = 'standby',
}

// TODO - need unique mac address and serial number
@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serialNumber: string;

  @Column()
  macAddress: string;

  @Column()
  platform: string;

  @Column()
  osVersion: string;

  // Use for PostgreSQL:
  // @Column({ type: 'enum', enum: DeviceStatus, default: DeviceStatus.STANDBY })
  @Column({ type: 'text', default: DeviceStatus.STANDBY })
  status: DeviceStatus;

  @OneToMany(() => DeviceChangelog, (deviceChangelog) => deviceChangelog.device)
  deviceChangelogs: DeviceChangelog[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
