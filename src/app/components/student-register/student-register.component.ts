import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  studentUSN: String;
  studentEmail: String;
  studentName: String;
  studentCollege: String;
  studentCourse: String;
  studentDepartment: String;
  studentContact: String;
  password: String;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
  }

  onStudentRegisterSubmit(){
    const addStudent = {
      studentUSN: this.studentUSN,
      studentEmail: this.studentEmail,
      studentName: this.studentName,
      studentCollege: this.studentCollege,
      studentCourse: this.studentCourse,
      studentDepartment: this.studentDepartment,
      studentContact: this.studentContact,
      password: this.password
    };

    this.studentService.studentRegistration(addStudent).subscribe((data: any) => {
      if(data.result === 1){
        alert("Registration Successfull");
        this.router.navigate(['/student/studentLogin']);
      } else if(data.result === 0) {
        alert("Registration Unsuccessfull");
      } else if(data.result === 2){
        alert("You are already registered");
      }
    })

  }

}
