import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PaginatedDeviceResponse, Device } from '@/app/devices/devices.types';

// What if there was a global service error handler?

// We could break the code into smaller services - Angular could also have a
// controller pattern that would examine the request and response objects, apply validation,
// or transformations.

// That context could then be consumed by the resolver layer which would be responsible for
// getting data into the DOM

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  getDevices(page: number, limit: number): Observable<PaginatedDeviceResponse> {
    return this.http
      .get<PaginatedDeviceResponse>(
        `http://localhost:3000/devices?page=${page}&limit=${limit}`
      )
      .pipe(
        map((data: PaginatedDeviceResponse) => {
          // Perform Validation Here (with Dto)
          return data;
        }),
        catchError((error) => {
          console.error('Error fetching devices:', error);
          return throwError(() => new Error('Error Processing Devices'));
        }),
        finalize(() => {
          console.log('Loading devices finished');
        })
      );
  }

  getDevice(id: number): Observable<Device> {
    return this.http.get<Device>(`http://localhost:3000/devices/${id}`).pipe(
      map((data: Device) => {
        // Perform Validation Here (with Dto)
        return data;
      }),
      catchError((error) => {
        console.error('Error fetching device:', error);
        return throwError(() => new Error('Error Processing Device'));
      })
    );
  }
}
