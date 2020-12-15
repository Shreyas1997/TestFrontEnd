import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  name: String = " ";
  usn: String = " ";

  constructor(private router: Router, private studentService: StudentService) {
    if (localStorage.getItem('studentUSN') != " " && localStorage.getItem('studentName') != " ") {
      this.usn = localStorage.getItem('studentUSN');
      this.name = localStorage.getItem('studentName');
    }

  };

  ngOnInit() {
  }

  openTestList(){
    this.router.navigate(["/student/allAssessments"])
  }

  onProfile(){
    this.router.navigate(["/student/studentProfile"]);
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
