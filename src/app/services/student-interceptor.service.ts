import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { StudentService } from '../services/student.service';

@Injectable({
  providedIn: 'root'
})
export class StudentInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next){
    let serviceIV = this.injector.get(StudentService);
    let ivRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${serviceIV.getToken()}`
      }
    });

    return next.handle(ivRequest);
  }
}
