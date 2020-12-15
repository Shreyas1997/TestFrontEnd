import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../../services/student.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  studentUSN: String;
  password: String;
  wrongCredentials: String = "";
  hide: Boolean = true;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
  }

  onStudentLoginSubmit() {
    const studentLoginParams = {
      studentUSN: this.studentUSN,
      password: this.password
    };

    if((studentLoginParams.studentUSN == '' || studentLoginParams.studentUSN == undefined || studentLoginParams.studentUSN == null) || (studentLoginParams.password == '' || studentLoginParams.password == undefined || studentLoginParams.password == null)){
      return this.wrongCredentials = "You need to enter valid credentials. Empty fields does not work."
    }

    this.studentService.studentLogin(studentLoginParams).subscribe((data: any) => {
      if (data.result === 1) {

        localStorage.setItem('iv', data.token);
        localStorage.setItem('studentUSN', data.studentUSN);
        localStorage.setItem('studentName', data.studentName);
        
        this.router.navigate(["/student/studentDashboard"]);
      }
    },
    (err: HttpErrorResponse) => {
      if(err.status === 400 && err.error.result === 0){
        this.wrongCredentials = err.error.message;
        this.router.navigate(['/student/studentLogin']);
      }
    })
  }

}
