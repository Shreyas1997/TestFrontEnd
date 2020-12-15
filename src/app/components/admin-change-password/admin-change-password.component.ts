import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AdminAuthService } from '../../services/admin-auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {
  hide: Boolean = true;
  password: String;

  constructor(@Inject(MAT_DIALOG_DATA) public data: String, private adminAuthService: AdminAuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  onChangeSubmit() {
    const changePasswordParams = {
      iv: localStorage.getItem('iv'),
      adminName: localStorage.getItem('adminName'),
      password: this.password
    }

    this.adminAuthService.changeAdminPassword(changePasswordParams).subscribe((data: any) => {
      if (data.result === 1) {
        alert(data.message);
        this.dialog.closeAll();
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 400 && err.error.result === 0) {
        alert(err.error.message);
      }
    })

  }

}
