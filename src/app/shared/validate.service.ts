import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Router} from "@angular/router";
import { log } from 'util';

@Injectable()
export class LoginService {

  userType = '';

  constructor (
    private http: HttpClient,
    private router: Router
  ) {}

  validateUser(name, password) {
    let url = "http://localhost:3000/login";
    let body = {
      "name" : name,
      "password" : password
    }
    return this.http.post<any>(url, body);
  }

  checkValidation(){
    let userid = localStorage.getItem("userid");
    this.userType = localStorage.getItem("usertype");
    if(userid){
      console.log(this.userType);
      return this.userType;
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  logout(){
    console.log("logging Out");
    localStorage.removeItem("usertype");
    localStorage.removeItem("userid");
    this.router.navigate(['/login']);
  }

}