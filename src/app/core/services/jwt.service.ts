import { Injectable } from '@angular/core';
import * as cookie from '../utils/cookie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  token: string;
  tokenType: string;
  expires: Date;

  constructor() { }
  setToken(res) {
    this.token = res.access_token;
    this.tokenType = res.token_type;
    this.expires = new Date(res.expires_in);
    cookie.set(environment.cookieKeys.accessToken, this.token, this.expires);
    cookie.set(environment.cookieKeys.tokenType, this.tokenType, this.expires);
  }
  getToken() {
    if(cookie.check(environment.cookieKeys.accessToken) && cookie.check(environment.cookieKeys.tokenType)) {
      this.token = cookie.get(environment.cookieKeys.accessToken);
      this.tokenType = cookie.get(environment.cookieKeys.tokenType);      
      return `${this.tokenType} ${this.token}`;
    } 
    return '';
  }
  
  removeToken() {
    this.token = '';
    this.tokenType = '';
    cookie.remove(environment.cookieKeys.accessToken);
    cookie.remove(environment.cookieKeys.tokenType);
  }
}
