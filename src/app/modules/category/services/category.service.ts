import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { CATEGORY_ENDPOINT } from 'src/app/core/enums/endpoints.enum';
import { Observable, throwError } from 'rxjs';
import { Category } from 'src/app/core/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  arrCate: Array<Category>;
  cate: Category;

  constructor(private apiService: ApiService) { }

  getList(): Observable<Category[]> {
    return this.apiService.get(CATEGORY_ENDPOINT.CATEGORY).pipe(
      map(res => {             
        this.arrCate = res.data.categories.map(data => new Category(data));
        return this.arrCate;
      })
    )
  }

  getById(id: number): Observable<Category> {
    return this.apiService.get(CATEGORY_ENDPOINT.CATEGORY, id).pipe(
      map(res => {            
        this.cate = new Category(res.data);
        return this.cate;
      })
    )
  }

  create(formData: any): Observable<Category> {
    console.log(formData)
    return this.apiService.post(CATEGORY_ENDPOINT.CATEGORY, formData).pipe(
      map((res: any) => {        
        this.cate = new Category(res.data);
        return this.cate;
      })
    )
  }

  updateAll(id, formData): Observable<Category> {
    return this.apiService.put(CATEGORY_ENDPOINT.CATEGORY, id, formData).pipe(
      map((res: any) => {
        this.cate = new Category(res.data);
        return this.cate;
      })
    )
  }

  delete(id): Observable<Category> {
    return this.apiService.delete(CATEGORY_ENDPOINT.CATEGORY, id).pipe(
      map((res: any) => {
        return res;
      })
    )
  }
  
}
