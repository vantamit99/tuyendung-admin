import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { CV_ENDPOINT } from 'src/app/core/enums/endpoints.enum';
import { Observable, throwError } from 'rxjs';
import { Cv } from 'src/app/core/models/cv';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  arrCv: Array<Cv>;
  cv: Cv;

  constructor(private apiService: ApiService) { }

  getList(): Observable<Cv[]> {
    return this.apiService.get(CV_ENDPOINT.CV).pipe(
      map(res => {             
        this.arrCv = res.data.cv.map(data => new Cv(data));
        return this.arrCv;
      })
    )
  }
  getById(id: number): Observable<Cv> {
    return this.apiService.get(CV_ENDPOINT.CV, id).pipe(
      map(res => {            
        this.cv = new Cv(res.data);
        return this.cv;
      })
    )
  }
  create(formData: any): Observable<Cv> {  
    return this.apiService.post(CV_ENDPOINT.CV, formData).pipe(
      map((res: any) => {        
        this.cv = new Cv(res.data);
        return this.cv;
      })
    )
  }
  updateAll(id, formData): Observable<Cv> {
    return this.apiService.put(CV_ENDPOINT.CV, id, formData).pipe(
      map((res: any) => {
        this.cv = new Cv(res.data);
        return this.cv;
      })
    )
  }
  delete(id): Observable<Cv> {
    return this.apiService.delete(CV_ENDPOINT.CV, id).pipe(
      map(res => res)
    )
  }
}
