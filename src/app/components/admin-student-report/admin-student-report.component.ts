import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';

import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-admin-student-report',
  templateUrl: './admin-student-report.component.html',
  styleUrls: ['./admin-student-report.component.css']
})
export class AdminStudentReportComponent implements OnInit {
  studentUSN: String;
  studentName: String;
  testResult: Array<Object> = [];
  studentAnswers: Array<Object> = [];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value: Number = 0;

  constructor(private router: Router, private adminAuthService: AdminAuthService) { }

  ngOnInit() {
    this.studentUSN = localStorage.getItem('reportUSN');
    this.studentName = localStorage.getItem('reportName');
  }

  report(studentUSN) {
    const reportParams = {
      iv: localStorage.getItem('iv'),
      studentUSN: studentUSN
    }
    this.adminAuthService.generateReport(reportParams).subscribe((data: any) => {
      if (data.result === 1) {
        this.testResult = data.data.testResult;
      }
    },
      (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.result === 0) {
          alert(err.error.message);
        }
      });
  }

  onBack() {
    localStorage.removeItem('reportUSN');
    localStorage.removeItem('reportName');
    this.router.navigate(['/adminDashboard/student']);
  }

}
