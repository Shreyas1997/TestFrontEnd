import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AdminAuthService } from '../../services/admin-auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-edit-exam',
  templateUrl: './admin-edit-exam.component.html',
  styleUrls: ['./admin-edit-exam.component.css']
})
export class AdminEditExamComponent implements OnInit {
  _id: String;
  testID: String;
  testDate: String;
  testDuration: Number;
  marksForRightAnswer: Number;
  marksForWrongAnswer: Number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private adminAuthService: AdminAuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }


  onExamUpdate(_id) {
    const updateTestParams = {
      iv: localStorage.getItem('iv'),
      _id: _id,
      testID: this.data.testID,
      testDate: this.data.testDate,
      testDuration: this.data.testDuration,
      marksForRightAnswer: this.data.marksForRightAnswer,
      marksForWrongAnswer: this.data.marksForWrongAnswer
    };

    this.adminAuthService.updateTest(updateTestParams).subscribe((data: any) => {
      if (data.result === 1) {
        alert(data.message);
        this.dialog.closeAll();
        this.adminAuthService.filter('Loading..');
      }
    },
      (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.result === 0) {
          alert(err.error.message);
        }
      })
  }

}
