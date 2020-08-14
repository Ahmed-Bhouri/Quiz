import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _injector: Injector, private _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let _authService = this._injector.get(AuthService)

    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + _authService.getUserToken()) });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              // do nothing for now
          }
          return event;
      }),
      catchError((error: HttpErrorResponse) => {             
          return throwError(error);
          
      })
      ,tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
         _authService.logOut()
         this._router.navigate(['/home'])
         return;
        }
        
      }
    })
    )
  }
}
