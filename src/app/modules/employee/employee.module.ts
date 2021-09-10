import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ AddEmployeeDialogComponent, EmployeeListComponent, EmployeeProfileComponent],
  imports: [
    CommonModule, SharedModule
  
  ],
  exports:[CommonModule,AddEmployeeDialogComponent, EmployeeListComponent, EmployeeProfileComponent]

})
export class EmployeeModule { }
