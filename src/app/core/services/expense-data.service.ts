import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseDataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const url = 'https://localhost:7273/api/ExpenseItem';
    return this.http.get(url);
  }

  // // Store data (example using a BehaviorSubject)
  // private dataSubject = new BehaviorSubject<any>(null);
  // data$ = this.dataSubject.asObservable();

  // storeData(data: any) {
  //   this.dataSubject.next(data);
  // }
}
