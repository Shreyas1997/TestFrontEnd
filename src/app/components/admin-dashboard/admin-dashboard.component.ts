import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private adminAuth: AdminAuthService) { }

  ngOnInit() {
  }

  onLogout() {
    const logoutParams = {
      iv: localStorage.getItem('iv')
    }
    this.adminAuth.adminLogout(logoutParams).subscribe((data: any) => {
      if (data.result === 1) {
        this.router.navigate(["/adminLogin"]);
        alert(data.message+"\n Time: "+data.logoutTime);
        localStorage.clear();
      }
    });
  }
}
