import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BackDropsService } from '../services/back-drops.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public _backdropService: BackDropsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._backdropService.showL();
    return next.handle(request).pipe(
        finalize(() => this._backdropService.hideL())
    );
  }
}
