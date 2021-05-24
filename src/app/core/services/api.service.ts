import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { Observable } from 'rxjs';
import * as URL from '../utils/url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  get(endpoint: string, data?: any) : Observable<any> {
    return this.http.get(URL.merge(environment.API_URL, endpoint, URL.query(data)));
  }
  post(endpoint: string, data: any = {}, option: any = null) : Observable<any> {
    let optionHeader = {};
    if(!option || option.type != 'multipart/form-data'){
      optionHeader = {
        headers: new HttpHeaders({
          'Content-Type': (option && option.type) ? option.type : 'application/json'
        })
      };
    } else {
      optionHeader = {
        headers: new HttpHeaders({})
      };
    }
   
    return this.http.post(environment.API_URL + endpoint, data, optionHeader);
  }
  put(endpoint: string, id: number, data: any = {}, option?: any) : Observable<any> {
    let convertId = String(id);
    let optionHeader = {};
    if(!option || option.type != 'multipart/form-data'){
      optionHeader = {
        headers: new HttpHeaders({
          'Content-Type': (option && option.type) ? option.type : 'application/json'
        })
      };
    } else {
      optionHeader = {
        headers: new HttpHeaders({})
      };
    }
    return this.http.put(URL.merge(environment.API_URL, endpoint, convertId), data, optionHeader);
  }
  delete(endpoint: string, id: number) : Observable<any> {
    let convertId = String(id);
    return this.http.delete(URL.merge(environment.API_URL, endpoint, convertId));
  }
}
