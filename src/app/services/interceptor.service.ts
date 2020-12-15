import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { AdminAuthService } from '../services/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next){
    let serviceIV = this.injector.get(AdminAuthService);
    let ivRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${serviceIV.getToken()}`
      }
    });

    return next.handle(ivRequest);
  }

  
}
