import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  ErrorInterceptorProvider,
  JwtInterceptorProvider,
} from './interceptors';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthGuard } from './guards';
import {
  ValidationMessagesComponent,
  ValidationService,
  DeviceBadgesComponent,
} from './components';
import { LayoutModule } from './layout/layout.module';
import { GatewayService, UserService } from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LayoutModule,
  ],
  declarations: [ValidationMessagesComponent, DeviceBadgesComponent],
  exports: [
    ValidationMessagesComponent,
    ToastrModule,
    LayoutModule,
    DeviceBadgesComponent,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        JwtInterceptorProvider,
        ErrorInterceptorProvider,
        ToastrService,
        AuthGuard,
        UserService,
        GatewayService,
        ValidationService,
      ],
    };
  }
}
