import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryParamsGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const queryParams = next.queryParams;
    const page = queryParams['page'] || 1;
    const pageSize = queryParams['limit'] || 10;

    if (!queryParams['page'] || !queryParams['limit']) {
      this.router.navigate([], {
        queryParams: { page, limit: pageSize },
        queryParamsHandling: 'merge', // Merge with existing query params if present
      });
      return false; // Prevent navigation to avoid duplicate redirects
    }

    return true;
  }
}
