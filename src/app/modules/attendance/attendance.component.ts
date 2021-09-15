import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceService } from 'src/app/services/attendance.service';
import { AttendanceDialogComponent } from './attendance-dialog/attendance-dialog.component';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  attendanceData:any;

  constructor(public dialog: MatDialog,
    private attendanceService: AttendanceService ) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res:any) =>{
      this.attendanceData = res.data;
    })
  }

  openDialog(data): void {
    const dialogRef  = this.dialog.open(AttendanceDialogComponent, {
      width: '300px',
      height: '500px',
      data: data
    });
  }

}
