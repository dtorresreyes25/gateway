import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../core/layout/layout.component';
import { GatewayListComponent } from './gateway-list/gateway-list.component';
import { GatewayFormComponent } from './gateway-form/gateway-form.component';
import { GatewayDetailsComponent } from './gateway-details/gateway-details.component';
import { GatewayDetailsResolver } from './gateway.resolver';
import { AuthGuard } from '../../core/guards';

const gatewayRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: GatewayListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        component: GatewayFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit/:gatewayId',
        component: GatewayFormComponent,
        canActivate: [AuthGuard],
        resolve: { gatewayDetails: GatewayDetailsResolver },
      },
      {
        path: 'details/:gatewayId',
        component: GatewayDetailsComponent,
        canActivate: [AuthGuard],
        resolve: { gatewayDetails: GatewayDetailsResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(gatewayRoutes)],
  exports: [RouterModule],
})
export class GatewayRoutingModule {}
