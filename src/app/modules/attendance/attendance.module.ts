import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { AttendanceDialogComponent } from './attendance-dialog/attendance-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeModule } from 'src/app/modules/employee/employee.module';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';



const routes: Routes = [
  {
    path:'',
    component:AttendanceComponent

  }
]

@NgModule({
  declarations: [AttendanceComponent, AttendanceDialogComponent,AttendanceTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EmployeeModule
  ]
})
export class AttendanceModule { }
