import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../../services/interfaces';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.css']
})
export class EmployeesPageComponent implements OnInit {
  employees:IEmployee[];

  columns = [
    { prop: 'user.id', name: 'Id', visible: false},
    { prop: 'user.first_name', name: 'First Name' },
    { prop: 'user.last_name', name: 'Last Name' },
    { prop: 'email', name: 'Email'},
    { prop: 'phone_number', name: 'Cell'},
    { prop: 'race', name: 'Race' },
    { prop: 'position.name', name: 'Position'},
    { prop: 'position.level', name: 'Level'}
  ];

  rowAction = {
    route: 'employees',    
    paramProp: 'user.id'
  };

  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe((data:IEmployee[])=> {
      this.employees = data;
    })
  }
}
