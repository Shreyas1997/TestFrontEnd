import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { AdminAuthService } from "../../services/admin-auth.service";
import { AdminEditQuestionsComponent } from "../admin-edit-questions/admin-edit-questions.component";

@Component({
  selector: 'app-question-dashboard',
  templateUrl: './question-dashboard.component.html',
  styleUrls: ['./question-dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuestionDashboardComponent implements OnInit {
  columnsToDisplay = ['question', 'correctOption', 'action'];
  expandedElement: null;
  sheet: any;
  testID: String;
  successNote: String;
  allTests: any = [];
  allQuestion: Array<Object> = [];
  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private adminAuthService: AdminAuthService, public dialog: MatDialog) {
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
        this.allTests = data.data;
      } else if (data.result === 0) {
        console.log('No Data');
      }
    })
  }


  onFileSelect(event) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      this.sheet = dataString;
    }
    reader.readAsBinaryString(file);
  }

  onIdSelect(event) {
    const getTestQuestion = {
      iv: localStorage.getItem('iv'),
      testID: event
    }

    this.adminAuthService.getTestQuestions(getTestQuestion).subscribe((data: any) => {
      if (data.result === 1) {
        this.allQuestion = data.data;
        this.dataSource.data = this.allQuestion;
      }
    })
  }

  onQuestionBulkUpload() {
    const newQuestion = {
      iv: localStorage.getItem('iv'),
      sheet: this.sheet,
      testID: this.testID
    };
    this.adminAuthService.addNewQuestions(newQuestion).subscribe((data: any) => {
      if (data.result === 1) {
        this.successNote = "Questions added Successfully"
        alert(this.successNote);
        this.onIdReload(newQuestion.testID)
      } else if (data.result === 0) {
        alert("Failure");
      }
    });
  }

  onIdReload(testID) {
    const getTestQuestion = {
      iv: localStorage.getItem('iv'),
      testID: testID
    }

    this.adminAuthService.getTestQuestions(getTestQuestion).subscribe((data: any) => {
      if (data.result === 1) {
        this.allQuestion = data.data;
        this.dataSource.data = this.allQuestion;
      }
    })
  }

  onUpdateQuestion(_id, testID, question, correctOption, a, b, c, d) {
    this.dialog.open(AdminEditQuestionsComponent, {
      data: {
        _id: _id,
        testID: testID,
        question: question,
        correctOption: correctOption,
        a: a,
        b: b,
        c: c,
        d: d,
      },
      height: '400px',
      width: '600px',
    });
  }

  onDeleteQuestion(_id, testID) {
    const deleteQuestionParams = {
      iv: localStorage.getItem('iv'),
      _id: _id,
      testID: testID
    }

    this.adminAuthService.deleteQuestion(deleteQuestionParams).subscribe((data: any) => {
      if (data.result === 1) {
        alert(data.message);
        this.onIdReload(deleteQuestionParams.testID)
      }
    })
  }

}
