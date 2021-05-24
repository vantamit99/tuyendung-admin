import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { POSTS_ENDPOINT } from 'src/app/core/enums/endpoints.enum';
import { Observable, throwError } from 'rxjs';
import { Posts } from 'src/app/core/models/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService { 
  arrPosts: Array<Posts>;
  posts: Posts;

  constructor(private apiService: ApiService) { }

  getList(): Observable<Posts[]> {
    return this.apiService.get(POSTS_ENDPOINT.POSTS).pipe(
      map(res => {             
        this.arrPosts = res.data.posts.map(data => new Posts(data));
        return this.arrPosts;
      })
    )
  }
  getById(id: number): Observable<Posts> {
    return this.apiService.get(POSTS_ENDPOINT.POSTS, id).pipe(
      map(res => {            
        this.posts = new Posts(res.data);
        return this.posts;
      })
    )
  }
  create(formData: any): Observable<Posts> {    
    return this.apiService.post(POSTS_ENDPOINT.POSTS, formData).pipe(
      map((res: any) => {        
        this.posts = new Posts(res.data);
        return this.posts;
      })
    )
  }
  updateAll(id, formData): Observable<Posts> {
    return this.apiService.put(POSTS_ENDPOINT.POSTS, id, formData).pipe(
      map((res: any) => {
        this.posts = new Posts(res.data);
        return this.posts;
      })
    )
  }
  delete(id): Observable<Posts> {
    return this.apiService.delete(POSTS_ENDPOINT.POSTS, id).pipe(
      map(res => res)
    )
  }
}
