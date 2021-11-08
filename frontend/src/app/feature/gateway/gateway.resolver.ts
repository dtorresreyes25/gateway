import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { GatewayService } from '../../core/services';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GatewayDetailsResolver implements Resolve<any> {
  constructor(
    private gatewayService: GatewayService,
    private toastr: ToastrService
  ) {}

  resolve(route: ActivatedRouteSnapshot): any {
    const id = route.paramMap.get('gatewayId');
    if (id) {
      return this.gatewayService.getById(id).pipe(
        map(
          (result: any) => {
            return result;
          },
          catchError(() => {
            this.toastr.error('Error fetching gateway');
            return of(null);
          })
        )
      );
    }
  }
}
