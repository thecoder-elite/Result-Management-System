import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/validate.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-exam',
  templateUrl: './get-exam.component.html',
  styleUrls: ['./get-exam.component.css']
})
export class GetExamComponent {

  department: string;
  year: number;
  exams = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
  ) {
    this.loginService.checkValidation();
    this.http.get<any>(`http://localhost:3000/getStudent?userId=${localStorage.getItem('userid')}`)
      .subscribe(data => {
        if (data.errorMsg)
          this.openSnackBar(data.errorMsg, 'cancel');
        else {
          this.department = data.data[0].department
          this.year = data.data[0].year
          let url = `http://localhost:3000/getExams?department=${this.department}&year=${this.year}`;
          this.http.get<any>(url)
            .subscribe(data => {
              if (data.errorMsg)
                this.openSnackBar(data.errorMsg, 'cancel');
              else
                this.exams = data.data
            })
        }
      })
  }

  onSubmit() {
  }

  gotoExam(examId) {
    this.router.navigate(['/marks'], { queryParams: { examId: examId } });
  }

  logout() {
    this.loginService.logout();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
    });
  }

}
