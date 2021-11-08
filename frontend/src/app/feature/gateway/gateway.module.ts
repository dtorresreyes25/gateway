import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GatewayFormComponent } from './gateway-form/gateway-form.component';
import { GatewayListComponent } from './gateway-list/gateway-list.component';
import { GatewayDetailsComponent } from './gateway-details/gateway-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { GatewayRoutingModule } from './gateway-routing.module';
import { GatewayService } from '../../core/services';
import { GatewayDetailsResolver } from './gateway.resolver';

@NgModule({
  declarations: [
    GatewayFormComponent,
    GatewayListComponent,
    GatewayDetailsComponent,
  ],
  imports: [
    GatewayRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
  ],
  providers: [GatewayService, GatewayDetailsResolver],
  bootstrap: [],
})
export class GatewayModule {}
