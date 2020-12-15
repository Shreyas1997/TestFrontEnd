import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AdminAuthService } from '../../services/admin-auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-edit-questions',
  templateUrl: './admin-edit-questions.component.html',
  styleUrls: ['./admin-edit-questions.component.css']
})
export class AdminEditQuestionsComponent implements OnInit {
  _id: String;
  testID: String;
  question: String;
  correctOption: String;
  a: String;
  b: String;
  c: String;
  d: String;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private adminAuthService: AdminAuthService, public dialog: MatDialog) { 
  }

  ngOnInit() {
  }
  

  onQuestionUpdate(_id) {
    const updateQuestionParams = {
      iv: localStorage.getItem('iv'),
      _id: _id,
      testID: this.data.testID,
      question: this.data.question,
      correctOption: this.data.correctOption,
      a: this.data.a,
      b: this.data.b,
      c: this.data.c,
      d: this.data.d
    };

    this.adminAuthService.updateQuestion(updateQuestionParams).subscribe((data: any) => {
      if (data.result === 1) {
        alert(data.message);
        this.dialog.closeAll();
        location.reload();
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
