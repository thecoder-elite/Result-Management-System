import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/validate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  subjects = [];
  students = [];
  examId = null;
  details = [];
  totalSubjects: number;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
  ) {
    this.loginService.checkValidation();
    this.route.queryParams
      .subscribe(params => {
        this.examId = params.examId;
      });
    this.http.get<any>(`http://localhost:3000/getDetails?examId=${this.examId}`)
      .subscribe(data => {
        if (data.errorMsg)
          this.openSnackBar(data.errorMsg, 'cancel');
        else {
          this.totalSubjects = data.data[0].totalSubjects;
          for (let i = 0; i < data.data[0].totalSubjects; i++) {
            this.subjects.push(data.data[0]["subject_" + i]);
            this.details.push({
              time: data.data[0]["subject_" + i + "_startTime"] + " - " + data.data[0]["subject_" + i + "_endTime"],
              date: data.data[0]["subject_" + i + "_date"],
              subject: data.data[0]["subject_" + i],
            });
          }


          this.http.get<any>(`http://localhost:3000/getStudentDetails/${this.examId}`)
            .subscribe(data => {
              if (data.errorMsg)
                this.openSnackBar(data.errorMsg, 'cancel');
              else {
                for (let i = 0; i < data.data.length; i++) {
                  this.students.push(data.data[i]);
                  let arr = []
                  for (let j = 0; j < this.totalSubjects; j++) {
                    arr.push(data.data[i]['subject_' + j + '_marks']);
                  }
                  this.students[i].marks = arr;
                }
              }
            })



        }
      })
  }

  gotoAddStudent() {
    this.router.navigate(['/addStudent'], { queryParams: { examId: this.examId } });
  }

  onSubmit() {

  }

  logout() {
    this.loginService.logout();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
    });
  }

  deleteStudent(e) {
    var button = e.target;
    var tr = button.parentNode; // the row to be removed
    let id = tr.id;
    this.http.delete<any>(`http://localhost:3000/delete/${id}/${this.examId}`)
      .subscribe(data => {
        if (data.errorMsg)
          this.openSnackBar(data.errorMsg, 'cancel');
        else {
          this.openSnackBar(data.msg, 'cancel')
          this.students = this.students.filter(elem => elem.studentID !== id)
        }
      })
  }

}
