import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class EmployeeService {

  constructor(private httpClient:HttpClient, private authenticationService:AuthenticationService){ }

  getEmployeeProfile(userId:number) {
    return this.httpClient.get(`http://staging.tangent.tngnt.co/api/employee/?user=${userId}`);
  }

  getAllReviews() {
    return this.httpClient.get(`http://staging.tangent.tngnt.co/api/review`);
  }

  getAllEmployees() {
    return this.httpClient.get(`http://staging.tangent.tngnt.co/api/employee/`);
  }
}
