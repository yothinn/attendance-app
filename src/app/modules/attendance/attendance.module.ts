import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { AttendanceDialogComponent } from './attendance-dialog/attendance-dialog.component';
import { EmployeeModule } from 'src/app/modules/employee/employee.module';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AttendanceRoutingModule } from 'src/app/modules/attendance/attendance-routing.module';
import { MatTimepickerModule } from 'mat-timepicker';
import { AttendanceSummaryComponent } from './attendance-summary/attendance-summary.component';


@NgModule({
  declarations: [AttendanceComponent, AttendanceDialogComponent,AttendanceTableComponent, AttendanceSummaryComponent],
  imports: [
    CommonModule,
    EmployeeModule,
    SharedModule,
    AttendanceRoutingModule,
    MatTimepickerModule
    

  ]
})
export class AttendanceModule { }
