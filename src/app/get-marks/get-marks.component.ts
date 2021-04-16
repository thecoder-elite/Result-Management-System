import { Component } from '@angular/core';
import { LoginService } from '../shared/validate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-marks',
  templateUrl: './get-marks.component.html',
  styleUrls: ['./get-marks.component.css']
})
export class GetMarksComponent {

  obj = {

  }
  details = [];
  examId: string;
  subjects = [];
  totalSubjects: number;
  students = [];
  totalMarks = [];
  percentage = 'Marks not yet declared';

  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private http: HttpClient,
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
            this.totalMarks.push(data.data[0]["subject_" + i+"_marks"])
            this.details.push({
              time: data.data[0]["subject_" + i + "_startTime"] + " - " + data.data[0]["subject_" + i + "_endTime"],
              date: data.data[0]["subject_" + i + "_date"],
              subject: data.data[0]["subject_" + i],
            });
          }

          this.http.get<any>(`http://localhost:3000/getStudentDetails/${this.examId}?userId=${localStorage.getItem('userid')}`)
          .subscribe(data => {
            if (data.errorMsg)
              this.openSnackBar(data.errorMsg, 'cancel');
            else {
              let obtained = 0;
              for (let i = 0; i < data.data.length; i++) {
                this.students.push(data.data[i]);
                let arr = []
                for(let j=0; j<this.totalSubjects; j++){
                  obtained += data.data[i]['subject_'+j+'_marks']
                  arr.push(`${data.data[i]['subject_'+j+'_marks']}`+" / "+this.totalMarks[j]);
                }
                this.students[i].marks = arr;
              }
              let total = this.totalMarks.reduce(function(a, b){
                return a + b;
            }, 0);
              let p = (obtained/total)*100
              this.percentage = p+"%";
            }
          })
        }
      })
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
}
