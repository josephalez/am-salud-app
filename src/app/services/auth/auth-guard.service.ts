import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
     providedIn: 'root'
})
export class AuthGuardService {

     constructor (
          public router: Router,
     ) { }

     canActivate(): boolean {
          const isLoggedIn = localStorage.getItem("isAuthenticated");
          if (!isLoggedIn) {
               this.router.navigateByUrl("sign-in");
               return false;
          }
          return true;
     }
}