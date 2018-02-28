import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {

  collapse:boolean = true;
  loggedIn:boolean = false;

  constructor(private authenticationService:AuthenticationService) { 
    this.authenticationService.loggedInEmitter.subscribe((loggedIn) => {      
      if(loggedIn) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })
  }
  
  ngOnInit() {
  }

}
