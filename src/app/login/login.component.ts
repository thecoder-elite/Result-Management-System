import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/validate.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {

  }

  onSubmit(e) {
    let userid = e.userid;
    let password = e.password;
    this.loginService
      .validateUser(userid, password)
      .subscribe(data => {
        if (data.userType) {
          let userType = data.userType;
          localStorage.setItem("userid", userid);
          localStorage.setItem("usertype", userType);
          if (userType === "admin") {
            this.router.navigate(['/home']);
          }
          else if (userType === "student") {
            this.router.navigate(['/exams']);
          }
        }
        else {
          this.openSnackBar(data.errorMsg, "");
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  isValid(text, type) {
    if (type === "userid") {
      // return text.length === 11 && !text.includes(" ");
      return true;
    }
    else if (type === "password") {
      return text.length > 0 && text.length < 10 && !text.includes(" ");
    }
  }

}