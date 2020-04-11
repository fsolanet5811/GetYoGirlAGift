import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  auth: any = {};

  constructor( private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    if (localStorage.getItem('currentUser')) {  
      // Store the attempted URL for redirecting
      return true;
    }
    else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(["/Homepage"], { queryParams: { returnUrl: state.url } });
      return false;
    }
  } 
}
