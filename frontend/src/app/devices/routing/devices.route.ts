import { Route } from '@angular/router';
import { DevicesComponent } from '@/app/devices/components/devices.component';
import { QueryParamsGuard } from '@/app/devices/guards/query-params.guard';
import { DevicesDataResolver } from '@/app/devices/resolvers/device-data.resolver';

export const DevicesRoute: Route = {
  path: '',
  component: DevicesComponent,
  runGuardsAndResolvers: 'always',
  canActivate: [QueryParamsGuard],
  resolve: {
    response: DevicesDataResolver,
  },
};
