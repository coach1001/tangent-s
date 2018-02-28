import { Component, OnInit } from '@angular/core';
import { IEmployee, IReviews } from '../../services/interfaces';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-employee-view-page',
  templateUrl: './employee-view-page.component.html',
  styleUrls: ['./employee-view-page.component.css']
})

export class EmployeeViewPageComponent implements OnInit {
  employee:IEmployee;
  employeeReviews:IReviews[];

  constructor(private employeeService:EmployeeService, private route:ActivatedRoute, private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params.id === 'me') {
        this.employeeService.getEmployeeProfile(this.authenticationService.getUserId()).subscribe((data)=>{
          this.employee = data[0];
        })
      } else if (parseInt(params.id)) {
        this.employeeService.getEmployeeProfile(parseInt(params.id)).subscribe((data:any)=>{
          this.employee = data[0];
        })
      }
      if (parseInt(params.id)) {
        this.employeeService.getAllReviews().subscribe((data:any)=>{
          console.log(data);
          this.employeeReviews = [];
          this.employeeReviews = data.filter((el) => {
            if(el.employee === params.id) return el;
          })
        })
        console.log(this.employeeReviews);
      }
    })
  }
}
