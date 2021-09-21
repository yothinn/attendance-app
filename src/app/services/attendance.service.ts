import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private onDataChange$ = new BehaviorSubject<any>({});
  public onDataChangedObservable$ = this.onDataChange$.asObservable();

  constructor(private http: HttpClient) { }

  getAttendance(pageNo = 1, size = 25, employeetId): Observable<any> {
    return this.http.get(`http://localhost:4000/api/attendances?query=${employeetId}&pageNo=${pageNo}&size=${size}`);
  }

  createAttendance(body: any): Observable<any> {
    return this.http.post('http://localhost:4000/api/attendances', body)
    .pipe(map((res:any)=>{
      this.onDataChange$.next(res.data);
      return res;   
    }));
  }

  updateAttendance(id,body: any): Observable<any> {
    return this.http.put(`http://localhost:4000/api/attendances/${id}`,body);
  }


}
