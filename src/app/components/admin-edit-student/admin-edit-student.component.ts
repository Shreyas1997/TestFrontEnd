import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AdminAuthService } from '../../services/admin-auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-edit-student',
  templateUrl: './admin-edit-student.component.html',
  styleUrls: ['./admin-edit-student.component.css']
})
export class AdminEditStudentComponent implements OnInit {
  studentUSN: String;
  studentEmail: String;
  studentName: String;
  studentCollege: String;
  studentCourse: String;
  studentDepartment: String;
  studentContact: String;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private adminAuthService: AdminAuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  onStudentUpdate(_id) {
    const updateStudentParams = {
      iv: localStorage.getItem('iv'),
      _id: this.data._id,
      studentUSN: this.data.studentUSN,
      studentEmail: this.data.studentEmail,
      studentName: this.data.studentName,
      studentCollege: this.data.studentCollege,
      studentCourse: this.data.studentCourse,
      studentDepartment: this.data.studentDepartment,
      studentContact: this.data.studentContact
    };

    this.adminAuthService.updateStudent(updateStudentParams).subscribe((data: any) => {
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
