import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-exam-list',
  templateUrl: './student-exam-list.component.html',
  styleUrls: ['./student-exam-list.component.css']
})
export class StudentExamListComponent implements OnInit {
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

    this.studentService.studentGetTest(token).subscribe((data: any) => {
      if (data.result === 1) {
        this.allTests = data.data;
      }
    });
  }

  openTestList(){
    this.router.navigate(["/student/allAssessments"])
  }

  onStartTest(_id, testID, studentUSN, studentName) {
    const enrollParams = {
      iv: localStorage.getItem('iv'),
      _id: _id,
      testID: testID,
      studentUSN: studentUSN
    };
    this.studentService.alreadyEnrolled(enrollParams).subscribe((data: any) => {
      if (data.result === 1) {
        var confirmation = confirm("Are you ready to attend the test?");

        if (confirmation == true) {
          const navigationExtras: NavigationExtras = {
            state: {
              _id: _id,
              testID: testID,
              studentUSN: studentUSN,
              studentName: studentName
            }
          }
          this.router.navigate(['/student/studentAssesment'], navigationExtras)
        } else {
          this.loadTestLists();
        }
      } else if (data.result === 2) {
        alert(data.message);
      }
    })
  }

}
