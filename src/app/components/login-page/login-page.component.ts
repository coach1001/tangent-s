import { Component, OnInit } from '@angular/core';
import { ILoginDetails } from '../../services/interfaces';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  
  submitted:boolean = false;
  formLoginDetails:any;
  
  constructor(private authenticationService:AuthenticationService) { }
  
  ngOnInit() {
    this.formLoginDetails = new FormGroup({
      username: new FormControl('pravin.gordhan', Validators.required),
      password: new FormControl('pravin.gordhan', Validators.required)
    });
  }

  attemptLogin(formLoginDetails:ILoginDetails) {        
    this.submitted =  true;
    this.authenticationService.authenticateUser(formLoginDetails).subscribe((loginReponse:{token?:string}) => {      
      this.authenticationService.getUserProfile(loginReponse.token).subscribe((res:{id?:number}) => {
        this.authenticationService.loginUser(loginReponse.token, formLoginDetails.username, res.id);
      })
      this.submitted = false;
    }, (error) => {
      this.authenticationService.logoutUser();
      this.submitted =  false;
    })
  }
}
