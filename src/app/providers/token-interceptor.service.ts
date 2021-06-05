import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})


export class TokenInterceptorService implements HttpInterceptor {


  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const newRequest = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      return next.handle(newRequest);

    } else { return next.handle(request); }
  }
}
