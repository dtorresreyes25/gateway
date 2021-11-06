import { ModuleWithProviders, NgModule } from '@angular/core';
import { ErrorInterceptorProvider, JwtInterceptorProvider } from './helpers';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthGuard } from './guards';

@NgModule({
  imports: [CommonModule, HttpClientModule, ToastrModule.forRoot()],
  declarations: [],
  exports: [],
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
      ],
    };
  }
}
