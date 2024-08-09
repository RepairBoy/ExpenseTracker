import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Expense } from '../../interfaces/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseDataService {
  // addExpenseData!:Expense;
  url:string = 'https://localhost:7273/api/ExpenseItem';
  
  constructor(private http: HttpClient) { }


  getData(): Observable<any> {
    // const ;
    return this.http.get(this.url);
  }

  // // Store data (example using a BehaviorSubject)
  // private dataSubject = new BehaviorSubject<any>(null);
  // data$ = this.dataSubject.asObservable();

  // storeData(data: any) {
  //   this.dataSubject.next(data);
  // }

  addExpense(addExpenseData:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'   
     })
    };
      return this.http.post<any>(this.url, addExpenseData, httpOptions)
    }

  deleteExpense(expenseId:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${expenseId}`);
  }

  updateExpense(expenseId:number,addExpenseData:string){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'   
     })
    };
    return this.http.put<any>(`${this.url}/${expenseId}`, addExpenseData, httpOptions)
  }
}
