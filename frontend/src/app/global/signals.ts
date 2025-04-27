import { signal, WritableSignal } from '@angular/core';
import { Device } from '@/app/devices/devices.types';

export const globalSignal = signal<boolean>(false);
// Perhaps this should be scoped?
export const selectedDeviceSignal: WritableSignal<Device | null> = signal(null);
