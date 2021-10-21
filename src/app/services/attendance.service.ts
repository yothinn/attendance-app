import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Attendance } from '../modules/attendance/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private onDataChange$ = new BehaviorSubject<any>({});
  public onDataChangedObservable$ = this.onDataChange$.asObservable();

  constructor(private http: HttpClient) { }

  getAttendance(pageNo , size , employeeId): Observable<Attendance> {
    console.log(employeeId)
    return this.http.get<Attendance>(`http://localhost:4000/api/attendances?employeeId=${employeeId}&pageNo=${pageNo}&size=${size}`).pipe
    (
      map((result:any) => {
        result.data = result.data.map(item => Object.assign(new Attendance(), item) )
        return result;
      })
    );
  }

  createAttendance(body: any): Observable<any> {
    return this.http.post('http://localhost:4000/api/attendances', body)
    .pipe(map((res:any)=>{
      this.onDataChange$.next(res.data);
      return res;   
    }));
  }


  updateAttendance(id,body: any): Observable<any> {
    console.log(id)
    return this.http.put(`http://localhost:4000/api/attendances/${id}`,body);
  }

  getAttendanceData(): Observable<any> {
    return this.http.get('http://localhost:4000/api/attendances');
  }
  

  


}
