import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  getAttendance(): Observable<any> {
    return this.http.get('http://localhost:3000/api/attendances');
  }

  createAttendance(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/attendances', body);
  }

  updateAttendance(id,body: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/attendances/${id}`,body);
  }


}
