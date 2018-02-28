
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AutenticationInterceptorService implements HttpInterceptor {
  
  constructor(public authenticationService: AuthenticationService) {}
  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    
    if(this.authenticationService.checkAuthenticationState()) {
      request = request.clone({
        setHeaders: {
          Authorization: `token ${this.authenticationService.getAuthenticationToken()}`
        }
      });
    }
    
    return next.handle(request);
  }
}