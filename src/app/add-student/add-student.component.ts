import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../shared/validate.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  details = [];
  years = [1, 2, 3, 4, 5];
  departments = ["Computer Engineering", "Information Technology", "Civil Engineering", "Mechanical Engineering"]
  examId: String;
  form = this.formBuilder.group({
    examID: '',
    examName: '',
    studentID: '',
    studentYear: '',
    studentDepartment: '',
  });
  noOfSubjects = []

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
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
          this.form.get('examID').setValue(data.data[0].examID);
          this.form.get('examName').setValue(data.data[0].examName);
          this.form.get('studentYear').setValue(data.data[0].forYear);
          this.form.get('studentDepartment').setValue(data.data[0].forDepartment);
          for (let i = 0; i < data.data[0].totalSubjects; i++) {
            this.form.addControl('subject_' + this.noOfSubjects.length, new FormControl(data.data[0]['subject_'+this.noOfSubjects.length]))
            this.form.addControl('subject_' + this.noOfSubjects.length + "_marks", new FormControl(''))
            this.noOfSubjects.push(this.noOfSubjects.length);
          }
        }
      })
  }

  onSubmit() {
    console.log('clicked');
    this.http.post<any>('http://localhost:3000/addStudentDetail', this.form.value)
      .subscribe(data => {
        if (data.message)
          this.openSnackBar(data.message, "");
        else
          this.openSnackBar(data.errorMsg, "");
      })
  }

  logout() {
    this.loginService.logout();
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
