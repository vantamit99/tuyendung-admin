import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router, public dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {      
        let messageErr = '';
        if(err.status == '401') {
          this.router.navigateByUrl('/auth/login');
          messageErr = `${err.error.data.error}: Please login`;
          this.dialog.closeAll();
          return throwError(messageErr)
        }        
        messageErr = err;
        return throwError(messageErr)
      })
    );
  }
}
