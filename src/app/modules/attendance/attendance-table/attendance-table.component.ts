import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Attendance } from '../attendance';
import { AttendanceDialogComponent } from '../attendance-dialog/attendance-dialog.component';


@Component({
  selector: 'app-attendance-table',
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.scss']
})
export class AttendanceTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() employeeId: string;
  employee: any;
  user: any;

  employeeData: any;
  test: Attendance;


  timeIn: any;
  timeOut: any;
  totalTime: any;


  
  pageNo: number = 1;
  pageSize: number = 10;

  table: any = {
    displayedColumns: [
      "no",
      "type",
      "date",
      "time"
    ],

    columns: [
      {
        "key": "no",
        "value": "ลำดับ",
      },
      {
        "key": "type",
        "value": "เข้างาน-ออกงาน",
      },
      {
        "key": "date",
        "value": "วัน/เดือน/ปี",
        "controlType":"datetime"
      },
      {
        "key": "time",
        "value": "เวลา",
        "controlType":"time"
      }
    ]
  }
  private _unsubscribeAll: Subject<any>;

  constructor(private attendanceService: AttendanceService,
              public dialog: MatDialog) {
    this._unsubscribeAll = new Subject();
    this.test = new Attendance();
  }

  ngAfterViewInit(): void {
    this.attendanceService.onDataChangedObservable$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
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
    this.attendanceService.getAttendance(this.pageNo, this.pageSize,this.employeeId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        console.log(res)
        this.employee = res;
        // this.totalTime = this.test.findSum(res.data);
        console.log( this.totalTime)
      }); 
  }

  openAttendanceDialog(): void {
    // console.log(data)
    const dialogRef = this.dialog.open(AttendanceDialogComponent, {
      width: '300px',
      height: '500px',
      data: 
      {
        isNew: true,
        info: {
          date:new Date(Date.now()),
          // time:'',
          customerId: this.employeeId,
          // contact: `${this.activeEmployee.firstName} ${this.activeEmployee.lastName} `,
          no: '---------- AUTO GEN ----------'
        }
      }
    });
  }

  // findSum(data){
  //   let workIn = data.filter(res => {
  //     return res.type === 'เข้างาน'

  // })
  //   let workOut = data.filter(res => {
  //     return res.type === 'ออกงาน'

  // })
  //    this.timeIn = workIn.map(res => res.dateTime)
  //    this.timeOut = workOut.map(res => res.dateTime)
  //    console.log(  this.timeIn)
  //    // console.log( this.totalOut.length)
      
  //    for (let i = 0;i < this.timeIn.length && i < this.timeOut.length;i++) {
      
  //      let timeIn  = new Date(this.timeIn[i])
  //      let timeOut = new Date(this.timeOut[i])
  //      console.log(  timeIn)
  //      let total = timeOut.getTime() - timeIn.getTime()
  //      let hours = Math.floor(total / (60 * 60 * 1000))
  //      let minutes = Math.floor(total / (60 * 1000))  - (hours * 60);
  //      this.totalTime =  {hour: hours, minute: minutes}
       
  //    }    
  // }
  onPageEventChanged(event: any): void {
    this.pageNo = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadItemList();
  }

  
}














