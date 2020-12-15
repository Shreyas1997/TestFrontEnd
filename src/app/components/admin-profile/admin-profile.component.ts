import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AdminChangePasswordComponent } from '../admin-change-password/admin-change-password.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  adminName: String = " ";

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(AdminChangePasswordComponent, {
      data: {
        adminName: this.adminName
      },
      height: '400px',
      width: '600px',
    });
  }

  ngOnInit() {
    this.adminName = localStorage.getItem('adminName');
  }

}
