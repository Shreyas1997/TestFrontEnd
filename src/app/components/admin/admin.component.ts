import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminName: String;
  password: String;
  hide: Boolean = true;
  wrongCredentials: String = " ";

  constructor(private adminAuthService: AdminAuthService, private router: Router) { }

  ngOnInit() {
  }

  onAdminLoginSubmit() {
    const admin = {
      adminName: this.adminName,
      password: this.password
    }

    this.adminAuthService.loginAdmin(admin).subscribe((data: any) => {
      if (data.result === 1) {
        localStorage.setItem('iv', data.token);
        localStorage.setItem('adminName', data.adminName);
        this.router.navigate(['/adminDashboard']);
      }
    },
      (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.result === 0) {
          this.wrongCredentials = err.error.message;
          this.router.navigate(['/adminLogin']);
        }
      }
    )

  }

}
