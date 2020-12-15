import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { StudentService } from '../services/student.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(private studentService: StudentService, private router: Router) { }
  canActivate(): boolean {
    if(this.studentService.tokenExist()){
      return true;
    } else {
      this.router.navigate(["/student/studentLogin"]);
      return false;
    }
  }
  
}
