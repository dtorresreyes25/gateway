import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = localStorage.getItem('currentUser');
    if (typeof window !== undefined && currentUser) {
      const { token } = JSON.parse(currentUser);
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
    return next.handle(req);
  }
}

export const JwtInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true,
};
