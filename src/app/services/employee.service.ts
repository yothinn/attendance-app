import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private onDataChanged$ = new Subject();
  onDataChangedObservable$: any;

  addContact(payLoad: any) {
    throw new Error('Method not implemented.');
  }
  addemployee(payLoad: any) {
    throw new Error('Method not implemented.');
  }
  

  constructor(private http: HttpClient) { }

  getEmployee(): Observable<any> {
    return this.http.get('http://localhost:3000/api/employees');
  }

  getEmployees(pageNo = 1, size = 5): Observable<any>{
    return this.http.get(`http://localhost:3000/api/employees?pageNo=${pageNo}&size=${size}`)
  }

  createEmployee(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/employees', body);
  }

  updateEmployee(id,body: any): Observable<any> {
    console.log(id)
    return this.http.put(`http://localhost:3000/api/employees/${id}`,body);
  }

  
  searchEmployee(text:any):Observable<any>{
    // console.log(text);
      return this.http.get(`http://localhost:3000/api/employees/search?query=${text}`);
    } 

    getEmployeeById(id: any): void {
      this.http.get(`http://localhost:3000/api/employees/${id._id}`)
        .subscribe((res: any) => {
         this.onDataChanged$.next(res.data);
        })
    }
}
