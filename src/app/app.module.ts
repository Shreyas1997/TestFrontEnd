import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MatTableModule,
  MatButtonModule,
  MatPaginatorModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatDialogModule,
  MatRadioModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminChangePasswordComponent } from './components/admin-change-password/admin-change-password.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminEditExamComponent } from './components/admin-edit-exam/admin-edit-exam.component';
import { AdminEditStudentComponent } from './components/admin-edit-student/admin-edit-student.component';
import { AdminEditQuestionsComponent } from './components/admin-edit-questions/admin-edit-questions.component';
import { AdminEditFacultyComponent } from './components/admin-edit-faculty/admin-edit-faculty.component';
import { ExamComponent } from './components/exam/exam.component';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { AdminStudentComponent } from './components/admin-student/admin-student.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AdminFacultyComponent } from './components/admin-faculty/admin-faculty.component';
import { FacultyListComponent } from './components/faculty-list/faculty-list.component';

import { QuestionDashboardComponent } from './components/question-dashboard/question-dashboard.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { StudentComponent } from './components/student/student.component';
import { HomeComponent } from './components/home/home.component';

import { AdminAuthService } from './services/admin-auth.service';
import { StudentService } from './services/student.service';
import { InterceptorService } from './services/interceptor.service';
import { StudentInterceptorService } from './services/student-interceptor.service';

import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentExamListComponent } from './components/student-exam-list/student-exam-list.component';
import { StudentAssessmentComponent } from './components/student-assessment/student-assessment.component';

import { AuthGuard } from './route_guards/auth.guard';
import { StudentGuard } from './route_guards/student.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentAllExamsComponent } from './components/student-all-exams/student-all-exams.component';
import { AdminStudentReportComponent } from './components/admin-student-report/admin-student-report.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminChangePasswordComponent,
    ExamComponent,
    ExamListComponent,
    AdminStudentComponent,
    StudentListComponent,
    AdminFacultyComponent,
    FacultyListComponent,
    QuestionDashboardComponent,
    QuestionListComponent,
    StudentRegisterComponent,
    StudentLoginComponent,
    StudentComponent,
    HomeComponent,
    StudentDashboardComponent,
    StudentExamListComponent,
    StudentAssessmentComponent,
    AdminProfileComponent,
    AdminEditExamComponent,
    AdminEditStudentComponent,
    AdminEditQuestionsComponent,
    AdminEditFacultyComponent,
    StudentAllExamsComponent,
    AdminStudentReportComponent,
    StudentProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    AdminChangePasswordComponent,
    AdminEditExamComponent,
    AdminEditStudentComponent,
    AdminEditQuestionsComponent,
    AdminEditFacultyComponent
  ],
  providers: [
    AdminAuthService,
    StudentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StudentInterceptorService,
      multi: true
    },
    AuthGuard,
    StudentGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
