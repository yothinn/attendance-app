import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AttendanceService } from 'src/app/services/attendance.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEmployeeDialogComponent } from '../employee/add-employee-dialog/add-employee-dialog.component';
import { AttendanceDialogComponent } from './attendance-dialog/attendance-dialog.component';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit,AfterViewInit, OnChanges, OnDestroy {
  attendanceData:any;
  employeeData: any ;
  activeEmployee:any;

 

  private _unsubscribeAll: any;

  constructor(public dialog: MatDialog,
    private attendanceService: AttendanceService,
    private employeeService:  EmployeeService,
    private ref: ChangeDetectorRef ) {this._unsubscribeAll = new Subject(); }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ref.detectChanges();
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    

    this.employeeService.getEmployee().subscribe((res:any) =>{
      this.employeeData = res.data;
    })
  }

  openAttendanceDialog(data): void {
    const dialogRef  = this.dialog.open(AttendanceDialogComponent, {
      width: '300px',
      height: '500px',
      data: {
        isNew: true,
        info: {
          created: new Date(Date.now()).toISOString(),
          customerId: this.activeEmployee._id,
          contact:`${this.activeEmployee.firstName} ${this.activeEmployee.lastName} ` ,
          no: '---------- AUTO GEN ----------'
        }
      }
    });
  }


  openDialogAddEmployeeDialog(data): void {
    const dialogRef  = this.dialog.open(AddEmployeeDialogComponent, {
      width: '300px',
      height: '500px',
      data: data
    });
  }

  chooseContact(data): void {
    this.activeEmployee = data;
    console.log(data)
  }



}
