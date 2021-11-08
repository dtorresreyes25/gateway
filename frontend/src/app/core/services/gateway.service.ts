import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Device, Gateway, ResponseDto } from '../models';

@Injectable()
export class GatewayService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Gateway[]> {
    return this.http
      .get<ResponseDto<Gateway[]>>(`${environment.apiEndpoint}/gateways`)
      .pipe(
        map((res) => res.data),
        catchError(this.handleErrorObservable)
      );
  }

  public getById(_id: string): Observable<Gateway> {
    return this.http
      .get<ResponseDto<Gateway>>(`${environment.apiEndpoint}/gateway/${_id}`)
      .pipe(
        map((res) => res.data),
        catchError(this.handleErrorObservable)
      );
  }

  public create(gateway: Gateway): Observable<Gateway> {
    return this.http
      .post<ResponseDto<Gateway>>(
        `${environment.apiEndpoint}/gateways`,
        gateway
      )
      .pipe(
        map((res) => res.data),
        catchError(this.handleErrorObservable)
      );
  }

  public update(gateway: Gateway): Observable<Gateway> {
    return this.http
      .put<ResponseDto<Gateway>>(
        `${environment.apiEndpoint}/gateway/${gateway._id}`,
        gateway
      )
      .pipe(
        map((res) => res.data),
        catchError(this.handleErrorObservable)
      );
  }

  public delete(_id: string): Observable<Gateway> {
    return this.http
      .delete<ResponseDto<Gateway>>(`${environment.apiEndpoint}/gateway/${_id}`)
      .pipe(
        map((res) => res.data),
        catchError(this.handleErrorObservable)
      );
  }

  public addDevice(_id: string, device: Device): Observable<Gateway> {
    return this.http
      .post<ResponseDto<Gateway>>(
        `${environment.apiEndpoint}/gateway/${_id}/device`,
        device
      )
      .pipe(
        map((res) => {
          return res.data;
        }),
        catchError(this.handleErrorObservable)
      );
  }

  private handleErrorObservable(error: HttpErrorResponse) {
    return throwError(error);
  }
}
