import { Component } from '@angular/core';
import { LoginService } from './shared/validate.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent {

  userType = '';
  userTypeAdmin = false;
  userTypeStudent = false;

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { 
    this.userType = this.loginService.checkValidation();
    if(this.userType === "admin"){
      this.userTypeAdmin = true;
      this.userTypeStudent = false;
      this.router.navigate(['/home']);
    }
    else if(this.userType === "student"){
      this.userTypeStudent = true;
      this.userTypeAdmin = false;
      this.router.navigate(['/exams']);
    }
    else{
      this.userType = '';
      this.userTypeStudent = false;
      this.userTypeAdmin = false;
    }
    console.log(this.userType);
  } 

  title = 'Result-Management-System';
}
