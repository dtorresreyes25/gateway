import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  ErrorInterceptorProvider,
  JwtInterceptorProvider,
} from './interceptors';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthGuard } from './guards';
import {
  AlertMessagesService,
  AlertMessagesComponent,
  ValidationMessagesComponent,
  ValidationService,
} from './components';
import { LayoutModule } from './layout/layout.module';
import { UserService } from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LayoutModule,
  ],
  declarations: [AlertMessagesComponent, ValidationMessagesComponent],
  exports: [
    AlertMessagesComponent,
    ValidationMessagesComponent,
    ToastrModule,
    LayoutModule,
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
        AlertMessagesService,
        UserService,
        ValidationService,
      ],
    };
  }
}
