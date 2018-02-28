import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticatedGuardService implements CanActivate {

  constructor(private authenticationService:AuthenticationService, private router:Router) { 
  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {    
    if(this.authenticationService.checkAuthenticationState()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
