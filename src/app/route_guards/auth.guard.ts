import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AdminAuthService } from '../services/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AdminAuthService, private router: Router) { }
  canActivate(): boolean {
    if(this.authService.tokenExist()){
      return true;
    } else {
      this.router.navigate(["/adminLogin"]);
      return false;
    }
  }
}
