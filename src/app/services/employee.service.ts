import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { IEmployee } from './interfaces';


@Injectable()
export class EmployeeService {

  constructor(private httpClient:HttpClient, private authenticationService:AuthenticationService){ }

  getEmployeeProfile(userId:number) {
    return this.httpClient.get(`http://staging.tangent.tngnt.co/api/employee/?user=${userId}`);
  }

  getAllReviews() {
    return this.httpClient.get(`http://staging.tangent.tngnt.co/api/review`);
  }
}
