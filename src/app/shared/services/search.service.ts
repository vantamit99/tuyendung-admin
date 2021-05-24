import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  valueSearch$ = new Rx.Subject();

  constructor() { }
}
