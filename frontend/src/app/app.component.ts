import { Subscription } from 'rxjs';
import { Component, effect, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { globalSignal, selectedDeviceSignal } from '@/app/global/signals';
import { LoadingDataService } from '@/app/global/loading-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  title = 'frontend';
  // Global Loading Indicator
  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private loadingDataService: LoadingDataService) {
    this.loadingSubscription = this.loadingDataService.loading.subscribe(
      (isLoading: boolean) => {
        this.loading = isLoading;
      }
    );
    // effect(() => {
    //   console.log('Global signal value changed:', globalSignal());
    // });

    // effect(() => {
    //   console.log(
    //     'Selected device signal value changed:',
    //     selectedDeviceSignal()
    //   );
    //   if (selectedDeviceSignal()) {
    //     console.log('Selected device:', selectedDeviceSignal());
    //   }
    // });
  }
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
