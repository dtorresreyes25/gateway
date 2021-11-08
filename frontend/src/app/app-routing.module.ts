import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/user/user.module').then((module) => module.UserModule),
  },
  {
    path: 'gateways',
    loadChildren: () =>
      import('./feature/gateway/gateway.module').then(
        (module) => module.GatewayModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
