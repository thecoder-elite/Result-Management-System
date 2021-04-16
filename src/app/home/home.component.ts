import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/validate.service';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  years = [1, 2, 3, 4];
  departments = ["Computer Engineering", "Information Technology", "Civil Engineering", "Mechanical Engineering"]

  exams = [];

  filter = this.formBuilder.group({
    forYear: '',
    forDepartment:'',
  });

  constructor(
    private loginService : LoginService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { 
    this.loginService.checkValidation();
    this.http.get<any>('http://localhost:3000/getExams?department=&year=')
      .subscribe(data => {
        if(data.errorMsg)
          this.openSnackBar(data.errorMsg, 'cancel');
        else
          this.exams = data.data
      })
  }

  onSubmit(){
    let url = `http://localhost:3000/getExams?department=${this.filter.get('forDepartment').value}&year=${this.filter.get('forYear').value}`;    
    this.http.get<any>(url)
      .subscribe(data => {
        console.log(data);
        
        if(data.errorMsg)
          this.openSnackBar(data.errorMsg, 'cancel');
        else
          this.exams = data.data
      })
  }

  gotoExamPage(){
    this.router.navigate(['/addExam']);
  }
  
  gotoExam(examId){
    this.router.navigate(['/student'], { queryParams: { examId: examId } });
  }

  logout(){
    this.loginService.logout();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
    });
  }
}
