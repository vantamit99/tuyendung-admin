import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Area } from 'src/app/core/models/area';
import { AREA_ENDPOINT } from 'src/app/core/enums/endpoints.enum';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  arrArea: Area[];
  area: Area;

  constructor(private apiService: ApiService) { }

  getList(): Observable<Area[]> {
    return this.apiService.get(AREA_ENDPOINT.AREA).pipe(
      map(res => {             
        this.arrArea = res.data.areas.map(data => {        
          return new Area(data)
        });
        return this.arrArea;
      })
    )
  }
  getById(id: number): Observable<Area> {
    return this.apiService.get(AREA_ENDPOINT.AREA, id).pipe(
      map(res => {            
        this.area = new Area(res.data);
        return this.area;
      })
    )
  }
  create(formData: any): Observable<Area> {
    console.log(formData)
    return this.apiService.post(AREA_ENDPOINT.AREA, formData).pipe(
      map((res: any) => {        
        this.area = new Area(res.data);
        return this.area;
      })
    )
  }
  updateAll(id, formData): Observable<Area> {
    return this.apiService.put(AREA_ENDPOINT.AREA, id, formData).pipe(
      map((res: any) => {
        this.area = new Area(res.data);
        return this.area;
      })
    )
  }
  delete(id): Observable<Area> {
    return this.apiService.delete(AREA_ENDPOINT.AREA, id).pipe(
      map((res: any) => {
        return res;
      })
    )
  }
}
