import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { DevicesService } from '@/app/devices/services/devices.service';
import { PaginatedDeviceResponse, Device } from '@/app/devices/devices.types';
import { globalSignal, selectedDeviceSignal } from '@/app/global/signals';

@Component({
  selector: 'app-devices',
  standalone: true,
  templateUrl: './devices.component.html',
  // imports: [RouterLink],
  providers: [DevicesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }), // initial state
        animate('500ms 100ms', style({ opacity: 1 })), // animate to full opacity
      ]),
    ]),
  ],
})
export class DevicesComponent {
  readonly response = input<PaginatedDeviceResponse>();
  readonly devices = computed(() => this.response()?.devices ?? []);

  onDeviceSelected(device: Device) {
    console.log('Device selected:', device);
    // Handle device selection logic here
    globalSignal.set(!globalSignal());
    // I wonder if this could be a router activation instead?
    // that routed component would then fetch the device details
    selectedDeviceSignal.set(device);
  }
}
