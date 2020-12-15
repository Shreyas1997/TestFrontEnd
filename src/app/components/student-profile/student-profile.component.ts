import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  studentName: String;
  studentUSN: String;
  studentInfo: any;
  studentTests: Array<Object> = [];
  studentReport: any;

  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit() {
    this.studentName = localStorage.getItem('studentName').toUpperCase();
    this.studentUSN = localStorage.getItem('studentUSN');
    this.loadProfile();
  }

  loadProfile(){
    const profileParams = {
      iv: localStorage.getItem('iv'),
      studentUSN: localStorage.getItem('studentUSN')
    };

    this.studentService.studentProfile(profileParams).subscribe((data: any) => {
      if (data.result === 1) {
        this.studentInfo = data.data;
        this.studentTests = this.studentInfo.enrolledTest;
        this.studentReport = data.report.testResult;
      }
    })
  }

  onBack(){
    this.router.navigate(['/student/studentDashboard']);
  }

  onLogout() {
    const logoutParams = {
      iv: localStorage.getItem('iv')
    }
    this.studentService.studentLogout(logoutParams).subscribe((data: any) => {
      if (data.result === 1) {
        this.router.navigate(["/student/studentLogin"]);
        alert(data.message+"\n Time: "+data.logoutTime);
        localStorage.clear();
      }
    });
  }

}
