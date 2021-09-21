import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AttendanceService } from 'src/app/services/attendance.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-attendance-table',
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.scss']
})
export class AttendanceTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() employeeId: string;
  employee: any;
  user: any;

  table: any = {
    displayedColumns: [
      "no",
      "dateTime",
      "workIn",
      "workOut",
      "workTime"
    ],
    columns: [
      {
        "key": "no",
        "value": "ลำดับ"
      },
      {
        "key": "dateTime",
        "value": "วันที่",
        "controlType": "datetime"
      },
      {
        "key": "workIn",
        "value": "เข้างาน",
        "controlType": "datetime"
      },
      {
        "key": "workOut",
        "value": "ออกงาน",
        "controlType": "datetime"
      },
      {
        "key": "workTime",
        "value": "เวลาการทำงาน",
        "controlType": "datetime"
      }
    ],
    menu: [
      "edit", "download"
    ]
  }
  private _unsubscribeAll: Subject<any>;

  constructor(private attendanceService: AttendanceService) 
  {this._unsubscribeAll = new Subject();}

  ngAfterViewInit(): void {
    this.attendanceService.onDataChangedObservable$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res=>{
      this.loadItemList();
      
    })
    
  }

 ngOnChanges(changes: SimpleChanges): void {
    console.log(this.employeeId)
    this.loadItemList();
  }

  ngOnDestroy(): void {
   this._unsubscribeAll.next();
   this._unsubscribeAll.complete();
  }
 


  ngOnInit(): void {
   
  }

  loadItemList() {
    this.attendanceService.getAttendance(1,10,this.employeeId)
      .subscribe((res: any) => {
        console.log(res)
        this.employee = res;
      });
  }

}
