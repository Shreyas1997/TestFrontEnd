import { Component, OnInit } from "@angular/core";
import * as XLSX from 'xlsx';
import { NgForm } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

import { AdminAuthService } from "../../services/admin-auth.service";

@Component({
  selector: "app-admin-student",
  templateUrl: "./admin-student.component.html",
  styleUrls: ["./admin-student.component.css"],
})
export class AdminStudentComponent implements OnInit {
  studentCollege: String;
  password: String;
  sheet: any;
  hide: Boolean = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private adminAuthService: AdminAuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    
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

  onStudentBulkUpload() { 
    const newStudent = {
      iv: localStorage.getItem('iv'),
      studentCollege: this.studentCollege,
      password: this.password,
      sheet: this.sheet
    };
    this.adminAuthService.addNewStudents(newStudent).subscribe((data: any) => {
      if (data.result === 1) {
        this.snackBar.open(data.message,'', {
          duration: 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this.adminAuthService.filter('Loading..');
      }
    },
    (err: HttpErrorResponse) => {
      if (err.status === 400 && err.error.result === 0) {
        alert(err.error.message);
      }
    });
  }
}
