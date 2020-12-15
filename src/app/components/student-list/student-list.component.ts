import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';

import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminEditStudentComponent } from '../admin-edit-student/admin-edit-student.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = [
    'studentUSN',
    'studentEmail',
    'studentName',
    'collegeName',
    'studentCourse',
    'studentDepartment',
    'studentContact',
    'action'
  ];
  allStudents: any = [];
  dataSource = new MatTableDataSource;
  result: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private adminAuthService: AdminAuthService, public dialog: MatDialog, private router: Router) {
    this.adminAuthService.listen().subscribe((data: any) => {
      this.loadStudents();
    });
  }

  ngOnInit() {
    this.loadStudents();
    this.dataSource.paginator = this.paginator;
  }

  loadStudents() {
    const adminToken = {
      iv: localStorage.getItem('iv')
    };
    this.adminAuthService.getAllStudents(adminToken).subscribe((data: any) => {
      if (data.result === 1) {
        this.allStudents = data.data;
        this.dataSource.data = this.allStudents;
      } else if (data.result === 0) {
        console.log('No Data');
      }
    })
  }

  onEditStudent(_id, studentUSN, studentEmail, studentName, studentCollege, studentCourse, studentDepartment, studentContact) {
    this.dialog.open(AdminEditStudentComponent, {
      data: {
        iv: localStorage.getItem('iv'),
        _id: _id,
        studentUSN: studentUSN,
        studentEmail: studentEmail,
        studentName: studentName,
        studentCollege: studentCollege,
        studentCourse: studentCourse,
        studentDepartment: studentDepartment,
        studentContact: studentContact
      },
      height: '400px',
      width: '600px',
    });
  }

  onGenerateReport(studentUSN, studentName){
    localStorage.setItem('reportUSN', studentUSN);
    localStorage.setItem('reportName', studentName);
    this.router.navigate(["/adminDashboard/student/report"]);
  }

  onDeleteStudent(studentUSN, studentEmail) {
    const deleteStudentParams = {
      iv: localStorage.getItem('iv'),
      studentUSN: studentUSN,
      studentEmail: studentEmail
    }

    var confirmation = confirm("Do you want to delete student with USN: " + studentUSN);

    if (confirmation == true) {
      this.adminAuthService.deleteStudent(deleteStudentParams).subscribe((data: any) => {
        if (data.result === 1) {
          alert('Student deleted');
          this.loadStudents();
        } else if (data.result === 0) {
          alert('Something went wrong');
        }
      });
    } else {
      alert("Deletion Cancelled");
    }
  }

}
