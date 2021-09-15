import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
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

  createEmployee(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/employees', body);
  }

  updateEmployee(id,body: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/employees/${id}`,body);
  }

  
  searchEmployee(text:any):Observable<any>{
    // console.log(text);
      return this.http.get(`http://localhost:3000/api/employees/search?query=${text}`);
    } 

    
}
