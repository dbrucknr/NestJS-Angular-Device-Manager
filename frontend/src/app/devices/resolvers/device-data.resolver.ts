import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { delay, finalize, map, catchError } from 'rxjs/operators';
import { LoadingDataService } from '@/app/global/loading-data.service';
import { DevicesService } from '@/app/devices/services/devices.service';
import { PaginatedDeviceResponse } from '@/app/devices/devices.types';

@Injectable({
  providedIn: 'root',
})
export class DevicesDataResolver implements Resolve<PaginatedDeviceResponse> {
  constructor(
    private devicesService: DevicesService,
    private loadingDataService: LoadingDataService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Ensure the route has query parameters
    const queryParams = route.queryParams;
    const page = queryParams['page'] || 1;
    const pageSize = queryParams['limit'] || 10;

    this.loadingDataService.showLoader();
    console.log('Loading devices...');
    return this.devicesService.getDevices(page, pageSize).pipe(
      map((data: PaginatedDeviceResponse) => {
        // Perform Validation Here (with Dto)
        console.log('Devices loaded:', data);
        return data;
      }),
      catchError((error) => {
        console.error('Error fetching devices:', error);
        throw new Error('Error Processing Devices');
      }),
      finalize(() => {
        this.loadingDataService.hideLoader();
        console.log('Loading devices finished');
        return;
      })
    );
  }
}
