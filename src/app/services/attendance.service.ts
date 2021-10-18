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

  getAttendance(pageNo = 1, size = 25, employeetId): Observable<Attendance> {
    return this.http.get<Attendance>(`http://localhost:4000/api/attendances?query=${employeetId}&pageNo=${pageNo}&size=${size}`).pipe
    (
      map((result:any) => {
        result.data = result.data.map(item => Object.assign(new Attendance(), item) )
        return result;
      })
    );
  }

  getDataAttendance(): Observable<any> {
    return this.http.get('http://localhost:4000/api/attendances');
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


  

  


}
