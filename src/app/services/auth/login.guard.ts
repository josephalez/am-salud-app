import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class LoginGuard implements CanActivate {
     constructor (
          public router: Router,
     ) { }


     canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          const isLoggedIn = localStorage.getItem("isAuthenticated");
          if (isLoggedIn) {
               this.router.navigate(['home']);
               return false;
          }
          return true;
     }

}
