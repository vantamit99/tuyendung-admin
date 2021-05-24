import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { AUTH_ENDPOINT } from 'src/app/core/enums/endpoints.enum';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  arrEndpoint: String[] = [AUTH_ENDPOINT.LOGIN];

  constructor(private jwtService: JwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {   
    let check = this.arrEndpoint.filter((endpoint: string) => request.url.includes(endpoint));
    if(check.length == 0) {
      if(this.jwtService.getToken()) {
        if(request.headers.has('Content-Type')) {
          request = request.clone({
            headers : new HttpHeaders({
              'Authorization' : this.jwtService.getToken(),
              'Content-Type' : request.headers.get('content-type'),
              'Accept': 'application/json'
            })
          })
        } else {
          request = request.clone({
            headers : new HttpHeaders({
              'Authorization' : this.jwtService.getToken(),              
            })
          })
        }
      }
    } else {
      if(request.headers.has('Content-Type')) {
        request = request.clone({
          headers : new HttpHeaders({            
            'Content-Type' : request.headers.get('content-type'),
            'Accept': 'application/json'
          })
        })
      }
    }
    

    return next.handle(request);
  }
}
