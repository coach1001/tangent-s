import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from './app-routing.module';
import { AuthenticatedGuardService } from './route-guards/authenticated-guard.service';

import { AppComponent } from './app.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { EmployeesPageComponent } from './components/employees-page/employees-page.component';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';
import { EmployeeViewPageComponent } from './components/employee-view-page/employee-view-page.component';

import { AuthenticationService } from './services/authentication.service';
import { EmployeeService } from './services/employee.service';
import { AutenticationInterceptorService } from './services/authentication-interceptor.service';
import { YesNoPipe } from './services/yes-no.pipe';
import { DataTableComponent } from './components/data-table/data-table.component';



@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    HomePageComponent,
    LoginPageComponent,
    EmployeesPageComponent,
    StatisticsPageComponent,
    EmployeeViewPageComponent,
    YesNoPipe,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AutenticationInterceptorService, multi: true
    },
    AuthenticationService,
    EmployeeService,
    AuthenticatedGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
