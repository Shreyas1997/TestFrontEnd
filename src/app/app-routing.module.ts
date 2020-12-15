import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";

import { AdminComponent } from "./components/admin/admin.component";
import { AdminProfileComponent } from "./components/admin-profile/admin-profile.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { ExamComponent } from "./components/exam/exam.component";
import { QuestionDashboardComponent } from "./components/question-dashboard/question-dashboard.component";
import { QuestionListComponent } from "./components/question-list/question-list.component";
import { AdminStudentComponent } from "./components/admin-student/admin-student.component";
import { AdminFacultyComponent } from "./components/admin-faculty/admin-faculty.component";
import { AdminStudentReportComponent } from "./components/admin-student-report/admin-student-report.component";

import { StudentComponent } from "./components/student/student.component";
import { StudentLoginComponent } from "./components/student-login/student-login.component";
import { StudentRegisterComponent } from "./components/student-register/student-register.component";
import { StudentDashboardComponent } from "./components/student-dashboard/student-dashboard.component";
import { StudentProfileComponent } from "./components/student-profile/student-profile.component";
import { StudentAllExamsComponent } from "./components/student-all-exams/student-all-exams.component";
import { StudentAssessmentComponent } from "./components/student-assessment/student-assessment.component";

import { AuthGuard } from './route_guards/auth.guard';
import { StudentGuard } from './route_guards/student.guard';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "adminLogin", component: AdminComponent },
  {
    path: "adminDashboard",
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/adminDashboard/exam', pathMatch: 'full' },
      { path: "profile", component: AdminProfileComponent },
      { path: "exam", component: ExamComponent },
      { path: "student", component: AdminStudentComponent },
      { path: "student/report", component: AdminStudentReportComponent },
      { path: "faculty", component: AdminFacultyComponent },
      { path: 'questionDashboard', component: QuestionDashboardComponent },
      { path: 'exam/questions', component: QuestionListComponent },
    ],
  },
  {
    path: "student", component: StudentComponent,
    children: [
      { path: '', redirectTo: '/student/studentLogin', pathMatch: 'full' },
      { path: "studentLogin", component: StudentLoginComponent },
      { path: "studentRegister", component: StudentRegisterComponent },
      { path: "allAssessments", component: StudentAllExamsComponent, canActivate: [StudentGuard] },
      { path: "studentDashboard", component: StudentDashboardComponent, canActivate: [StudentGuard] },
      { path: "studentProfile", component: StudentProfileComponent, canActivate: [StudentGuard] },
      { path: "studentAssesment", component: StudentAssessmentComponent, canActivate: [StudentGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
