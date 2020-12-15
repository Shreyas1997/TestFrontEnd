import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  testID: String;
  testDate: String;
  testDuration: String;
  marksForRightAnswer: Number;
  marksForWrongAnswer: Number;

  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit() {
    
  }

  onSubmitNewTest(){
    const newTest = {
      iv: localStorage.getItem('iv'),
      testID: this.testID,
      testDate: this.testDate,
      testDuration: this.testDuration,
      marksForRightAnswer: this.marksForRightAnswer,
      marksForWrongAnswer: this.marksForWrongAnswer
    }

    this.adminAuthService.addNewTest(newTest).subscribe((data: any) => {
      if (data.result === 1) {
        this.testID = " ";
        this.testDate = " ";
        this.testDuration = " ";
        this.marksForRightAnswer = 0;
        this.marksForWrongAnswer = 1;

        alert("New test Added");
      } else if (data.result === 0) {
        alert("Something went wrong");
      }
    });
    this.adminAuthService.filter('Loading..');
  }

}
