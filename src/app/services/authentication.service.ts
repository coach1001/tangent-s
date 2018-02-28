import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { ILoginDetails, IAuthenticationState } from '../services/interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {  
  
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedInEmitter: Observable<boolean> = this._loggedIn.asObservable();

  currentAuthenticationState:IAuthenticationState = {
    isAuthenticated: false,
    authenticationToken: '',
    username: ''
  }  

  currentLoginDetails:ILoginDetails = {
    username: '',
    password: ''
  }
  
  constructor(private httpClient:HttpClient, private router:Router) {}

  authenticateUser(lid:ILoginDetails) {
    let body:string = `username=${lid.username}&password=${lid.password}`;    
    return this.httpClient.post('http://staging.tangent.tngnt.co/api-token-auth/', {
        username: lid.username,
        password: lid.password
      }, {headers: {'Content-Type': 'application/json'}});
  }

  getUserProfile(token:string) {
    return this.httpClient.get('http://staging.tangent.tngnt.co/api/user/me/', {
      headers: {
        Authorization: `token ${token}`
      }
    });
  }

  loginUser(token:string, username:string, id:number) {    
    this.currentAuthenticationState.isAuthenticated = true;
    this.currentAuthenticationState.authenticationToken = token;
    this.currentAuthenticationState.username = username;    
    this.currentAuthenticationState.id = id;
    localStorage.setItem('__empDashAppAuthState', JSON.stringify(this.currentAuthenticationState));
    this._loggedIn.next(true);
    this.router.navigate(['employees/me']);
  }

  logoutUser() {
    this.currentAuthenticationState.authenticationToken = '';
    this.currentAuthenticationState.isAuthenticated = false;
    this.currentAuthenticationState.username = '';
    localStorage.removeItem('__empDashAppAuthState');
    this.router.navigate(['login']);
    this._loggedIn.next(false);
  }

  checkLocalAuthenticationState() {    
    if(localStorage.getItem('__empDashAppAuthState') === null) {      
      this.logoutUser();
      this.router.navigate(['login']);
    } else {      
      this.currentAuthenticationState = JSON.parse(localStorage.getItem('__empDashAppAuthState'));
      this._loggedIn.next(true);
    }
  }

  checkAuthenticationState():boolean {
    return this.currentAuthenticationState.isAuthenticated;
  }

  getAuthenticationToken():string {
    return this.currentAuthenticationState.authenticationToken;
  }

  getUsername():string {
    return this.currentAuthenticationState.username;
  }

  getUserId():number {    
    return this.currentAuthenticationState.id;
  }
}
