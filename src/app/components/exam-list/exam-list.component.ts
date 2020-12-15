import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminEditExamComponent } from '../admin-edit-exam/admin-edit-exam.component';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  displayedColumns: string[] = [
    'testID',
    'testDate',
    'testDuration',
    'totalQuestions',
    'marksForRightAnswer',
    'marksForWrongAnswer',
    'action'
  ];
  allTests: any = [];
  questions: any = [];
  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private adminAuthService: AdminAuthService, private router: Router, public dialog: MatDialog) {
    this.adminAuthService.listen().subscribe((data: any) => {
      this.loadTests();
    });
  }

  ngOnInit() {
    this.loadTests();
    this.dataSource.paginator = this.paginator;
  }

  loadTests() {
    const adminToken = {
      iv: localStorage.getItem('iv')
    };

    this.adminAuthService.getAllTests(adminToken).subscribe((data: any) => {
      if (data.result === 1) {
        this.allTests = data.data.slice().reverse();
        this.dataSource.data = this.allTests;
      } else if (data.result === 0) {
        console.log('No Data');
      }
    })
  }

  openDialog(_id, testID, testDate, testDuration, marksForRightAnswer, marksForWrongAnswer) {    
    this.dialog.open(AdminEditExamComponent, {
      data: {
        _id: _id,
        testID: testID,
        testDate: testDate,
        testDuration: testDuration,
        marksForRightAnswer: marksForRightAnswer,
        marksForWrongAnswer: marksForWrongAnswer
      },
      height: '400px',
      width: '600px',
    });
  }

  onViewDetails(testID) {
    localStorage.removeItem('testID');
    const getTestQuestion = {
      iv: localStorage.getItem('iv'),
      testID: testID
    };
    this.adminAuthService.getTestQuestions(getTestQuestion).subscribe((data: any) => {
      if (data.result === 1 && data.data.length != 0) {
        localStorage.setItem('testID', getTestQuestion.testID);
        this.router.navigate(["/adminDashboard/exam/questions"]);
      } else if (data.result === 1 && data.data.length === 0) {
        alert('No Data');
      }
    },
      (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.result === 0) {
          alert(err.error.message);
        }
      })
  }

  onDeleteTest(_id, testID) {
    const deleteTestParams = {
      iv: localStorage.getItem('iv'),
      _id: _id,
      testID: testID
    };

    var confirmation = confirm("Do you want to delete test: " + testID + "?");

    if (confirmation == true) {
      this.adminAuthService.deleteTest(deleteTestParams).subscribe((data: any) => {
        if (data.result === 1) {
          alert("Test Deleted");
          this.loadTests();
        } else if (data.result === 0) {
          alert("Something went wrong");
        }
      })
    } else {
      alert("Deletion Cancelled");
    }
  }

}
