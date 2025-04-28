import { catchError, map, switchMap, throwError, from } from 'rxjs';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@angular/core';
import { DevicesService } from '@/app/devices/services/devices.service';
import { PaginatedDeviceResponse } from '@/app/devices/devices.types';
import { FindAllDeviceResponseDto } from '@/app/devices/dto/find-all-device-response.dto';

@Injectable({
  providedIn: 'root',
})
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  getDevices(page: number, limit: number) {
    return this.devicesService.getDevices(page, limit).pipe(
      switchMap((response: PaginatedDeviceResponse) => {
        const devicesResponse = plainToClass(
          FindAllDeviceResponseDto,
          response
        );
        return from(validate(devicesResponse)).pipe(
          map((errors) => {
            // If there are validation errors, handle them
            if (errors.length > 0) {
              //   console.error('Validation errors:', errors);
              throw new Error('Device Response Failed to Validate.'); // This will throw an error
            }
            // If no errors, return the validated response
            return devicesResponse;
          }),
          catchError((error) => {
            // If validation error occurs, rethrow it for the outer catchError
            return throwError(
              () => new Error('Controller Validation Failed. ' + error.message)
            );
          })
        );
      })
      // This might be good to have in the controller layer:
      //   catchError((error) => {
      //     // Catch errors from validation or service call here
      //     return throwError(
      //       () => new Error('Controller Errors: ' + error.message)
      //     );
      //   })
    );
  }
}
