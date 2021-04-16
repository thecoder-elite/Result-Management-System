import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { LoginComponent } from './login/login.component';
import {StudentComponent} from './student/student.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { GetExamComponent } from './get-exam/get-exam.component';
import { GetMarksComponent } from './get-marks/get-marks.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'student', component: StudentComponent },
  { path: 'addExam', component: AddExamComponent },
  { path: 'addStudent', component: AddStudentComponent },
  { path: 'exams', component: GetExamComponent },
  { path: 'marks', component: GetMarksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
