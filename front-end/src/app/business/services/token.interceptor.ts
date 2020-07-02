import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import {throwError} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwNTI3MjcyMDg0IiwicGljIjoiIiwidXNlclR5cGUiOiJTdG9yZUFkbWluIiwiYWN0aXZlIjpmYWxzZSwicHJvdmlkZXIiOiJMT0NBTCIsImRlbGl2ZXJ5QWRkcmVzcyI6W10sInN0b3JlcyI6WyI1Y2RlYWM5MjQ2ODdiZjAxZDkwZDAzZDkiLCI1Y2RlYWM5MzQ2ODdiZjAxZDkwZDA0MDciLCI1Y2RlYWM5MzQ2ODdiZjAxZDkwZDA0MjEiXSwiX2lkIjoiNWUzMjE1Y2FkZTI4NDg2N2RjNGM4MmQ4IiwiZnVsbE5hbWUiOiLXpNeV16TXp9eV15Eg16fXldeg16HXmNeg15jXmdefIiwiY291bnRyeSI6IiIsIm1haWwiOiJnbHBvcGtvdkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiIsImJpcnRoZGF5IjpudWxsLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTI5VDIzOjMxOjIyLjk1OFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA0LTAzVDAwOjEwOjE1LjA0NFoiLCJfX3YiOjAsImlhdCI6MTU5MzEwMjU1NiwiZXhwIjoxNTkzMTYyNTU2fQ.yX6TaJdvGLo6gb2EKaEt7ulfOspb5NcrfAJNR-vDV70";
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }

}
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((response: any) => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
        }
        return throwError(response);

      });
  }
}
