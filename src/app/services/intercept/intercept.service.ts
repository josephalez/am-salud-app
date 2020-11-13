// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
  // intercept request and add token

  constructor (private service: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // tslint:disable-next-line:no-debugger
    // modify request
    // request = request.clone({
    // 	setHeaders: {
    // 		Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    // 	}
    // });
    // console.log('----request----');
    // console.log(request);
    // console.log('--- end of request---');
    /* console.log(request); */
    /*     console.log(request);
        const token = "esto es un token";
        request = request.clone({
          setHeaders: {
            authorization: `Bearer ${token}`
          }
        });
        console.log(request); */
    /*     console.log(request);
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem(environment.authTokenKey)}`
          }
        }); */

    /*     const token: string = localStorage.getItem(environment.authTokenKey);
    
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("token si");
        } else {
          console.log("token no ");
        } */


    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // console.log('all looks good');
            // http response status code
            // console.log(event.status);
          }
        },
        error => {
          console.log("-------------- intercept -------------------");
          console.log(error);
          console.log(error.error);
          // http response status code
          // console.log('----response----');
          // console.error('status code:');
          // tslint:disable-next-line:no-debugger
          console.error(error.status);
          console.error(error.message);
          // console.log('--- end of response---');
          console.log("-------------- end intercept -------------------");
          if (error.status == 401) {
            this.service.logout();
          }
        }
      )
    );
  }
}
