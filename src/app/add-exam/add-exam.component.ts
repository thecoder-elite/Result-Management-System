import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/validate.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent {

  ExamInfo = this.formBuilder.group({
    examID: '',
    examName: '',
    examStartDate: '',
    examEndDate: '',
    forYear: '',
    forDepartment: '',
    totalSubjects: 1,
    subject_0: '',
    subject_0_date: '',
    subject_0_startTime: '',
    subject_0_endTime: '',
    subject_0_marks: '',
  });

  noOfExams = [0];
  years = [1, 2, 3, 4, 5];
  departments = ["Computer Engineering", "Information Technology", "Civil Engineering", "Mechanical Engineering"]

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
  ) {
    this.loginService.checkValidation();
  }

  onSubmit() {
    this.http.post<any>('http://localhost:3000/createExam', this.ExamInfo.value)
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

  addSubjectDetails() {
    this.ExamInfo.addControl('subject_' + this.noOfExams.length, new FormControl(''))
    this.ExamInfo.addControl('subject_' + this.noOfExams.length + "_date", new FormControl(''))
    this.ExamInfo.addControl('subject_' + this.noOfExams.length + "_startTime", new FormControl(''))
    this.ExamInfo.addControl('subject_' + this.noOfExams.length + "_endTime", new FormControl(''))
    this.ExamInfo.addControl('subject_' + this.noOfExams.length + "_marks", new FormControl(''))
    this.noOfExams.push(this.noOfExams.length);
    this.ExamInfo.get('totalSubjects').setValue(this.noOfExams.length);
  }

  removeSubjectDetails() {
    if (this.noOfExams.length > 0) {
      this.noOfExams.shift();
      this.ExamInfo.removeControl('subject_' + this.noOfExams.length)
      this.ExamInfo.removeControl('subject_' + this.noOfExams.length + "_date")
      this.ExamInfo.removeControl('subject_' + this.noOfExams.length + "_startTime")
      this.ExamInfo.removeControl('subject_' + this.noOfExams.length + "_endTime")
      this.ExamInfo.removeControl ('subject_' + this.noOfExams.length + "_marks")
      this.ExamInfo.get('totalSubjects').setValue(this.noOfExams.length);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
