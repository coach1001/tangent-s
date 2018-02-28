import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { EmployeesPageComponent } from './components/employees-page/employees-page.component';
import { EmployeeViewPageComponent } from './components/employee-view-page/employee-view-page.component';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';

import { AuthenticatedGuardService } from './route-guards/authenticated-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'employees', 
    component: EmployeesPageComponent, 
    canActivate: [AuthenticatedGuardService] 
  },
  { path: 'employees/:id', 
    component: EmployeeViewPageComponent, 
    canActivate: [AuthenticatedGuardService] 
  },
  { path: 'statistics', 
    component: StatisticsPageComponent,
    canActivate: [AuthenticatedGuardService] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
