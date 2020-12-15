import { Component, OnInit, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-all-exams',
  templateUrl: './student-all-exams.component.html',
  styleUrls: ['./student-all-exams.component.css']
})
export class StudentAllExamsComponent implements OnInit {
  @Input() studentUSN: String;
  @Input() studentName: String;
  allTests: any = [];

  constructor(private router: Router, private studentService: StudentService) {
    this.studentService.listen().subscribe((data: any) => {
      this.loadTestLists();
    });
   }

  ngOnInit() {
    this.loadTestLists();
  }

  loadTestLists() {
    const token = {
      iv: localStorage.getItem('iv'),
      studentUSN: localStorage.getItem('studentUSN')
    }

    this.studentService.studentAllTests(token).subscribe((data: any) => {
      if (data.result === 1) {
        this.allTests = data.data;
      }
    });
  }

  onBack(){
    this.router.navigate(['/student/studentDashboard']);
  }

  onEnroll(_id, testID, usn) {
    const enrollParams = {
      iv: localStorage.getItem('iv'),
      _id: _id,
      testID: testID,
      studentUSN: localStorage.getItem('studentUSN')
    };

    this.studentService.alreadyEnrolled(enrollParams).subscribe((data: any) => {
      if (data.result === 1) {
        alert(data.message);
      } else if (data.result === 2) {
        this.studentService.enrollStudent(enrollParams).subscribe((data: any) => {
          if (data.result === 1) {
            alert(data.message);
            this.loadTestLists();
          } else if (data.result === 0) {
            alert(data.message);
          }
        })
      }
    })
  }

}
