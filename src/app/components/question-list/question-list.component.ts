import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { AdminAuthService } from "../../services/admin-auth.service";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuestionListComponent implements OnInit {
  columnsToDisplay = ['question', 'correctOption'];
  expandedElement: null;
  question: any = [];
  testID: String;
  enrollTotal: Number;
  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private router: Router, private adminAuthService: AdminAuthService) {
    const navigation = this.router.getCurrentNavigation();
    this.testID = localStorage.getItem('testID');
  }

  ngOnInit() {
    this.getEnrolledUserTotal(this.testID);
    this.onViewDetails(this.testID);
    this.dataSource.paginator = this.paginator;
  }

  onViewDetails(testID) {

    const getTestQuestion = {
      iv: localStorage.getItem('iv'),
      testID: testID
    };
    this.adminAuthService.getTestQuestions(getTestQuestion).subscribe((data: any) => {
      if (data.result === 1) {
        this.question = data.data;
        this.dataSource.data = this.question;
      }
    },
      (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.result === 0) {
          alert(err.error.message);
        }
      })
  }

  getEnrolledUserTotal(testID) {
    const getTestByID = {
      iv: localStorage.getItem('iv'),
      testID: testID
    };

    this.adminAuthService.getEnrollTotal(getTestByID).subscribe((data: any) => {
      if (data.result === 1) {
        this.enrollTotal = data.data.enrolledUser.length;
      }
    },
      (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.result === 0) {
          alert(err.error.message);
        }
      })

  }

  onBack(){
    localStorage.removeItem('testID');
    this.router.navigate(['/adminDashboard/exam']);
  }

}
