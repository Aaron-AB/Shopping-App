import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationServiceService } from "./authentication-service.service";
import { AngularFireAuth } from "@angular/fire/auth";



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, 
              private auth: AuthenticationServiceService, 
              private ngAuth: AngularFireAuth
              ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (this.auth.checkLogin()) {
      console.log(this.ngAuth.currentUser);
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
  
}