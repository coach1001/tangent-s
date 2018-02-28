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

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'user.first_name', name: 'First Name' },
    { prop: 'user.last_name', name: 'Last Name' },
    { prop: 'email', name: 'Email'},
    { prop: 'phone_number', name: 'Cell'},
    { prop: 'race', name: 'Race' },
    { prop: 'position.name', name: 'Position'},
    { prop: 'position.level', name: 'Level'}
  ];

  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe((data:IEmployee[])=> {
      this.employees = data;
    })
  }
}
