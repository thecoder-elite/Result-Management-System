import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule} from '@angular/material/select';
// import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'; 
import {MatIconModule} from '@angular/material/icon';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { GetExamComponent } from './get-exam/get-exam.component';
import { GetMarksComponent } from './get-marks/get-marks.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    StudentComponent,
    AddExamComponent,
    AddStudentComponent,
    GetExamComponent,
    GetMarksComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatRadioModule,
    MatSelectModule, 
    // MatSliderModule, 
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
