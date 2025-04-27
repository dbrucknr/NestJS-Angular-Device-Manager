import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Device } from '@modules/devices/entities/device.entity';

// We can add in a user id or username to track who made the change
@Entity()
export class DeviceChangelog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Device, (device) => device.deviceChangelogs)
  device: Device;

  @Column()
  previousAttributes: string;

  @Column()
  changedAttributes: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
