import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { LoadingDataService } from '@/app/global/loading-data.service';
import { DevicesController } from '@/app/devices/controllers/devices.controller';
import { PaginatedDeviceResponse } from '@/app/devices/devices.types';

@Injectable({
  providedIn: 'root',
})
export class DevicesDataResolver implements Resolve<PaginatedDeviceResponse> {
  constructor(
    private devicesController: DevicesController,
    private loadingDataService: LoadingDataService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.loadingDataService.showLoader();
    // Ensure the route has query parameters
    const queryParams = route.queryParams;
    const page = queryParams['page'] || 1;
    const pageSize = queryParams['limit'] || 10;

    return this.devicesController.getDevices(page, pageSize).pipe(
      catchError((error) => {
        return throwError(
          () => new Error('Could Not Resolve Device Data. ' + error)
        );
      }),
      finalize(() => {
        this.loadingDataService.hideLoader();
        console.log('Loading devices finished');
      })
    );
  }
}
