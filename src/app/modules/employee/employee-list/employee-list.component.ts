import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/alert.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: [
  ]
})
export class EmployeeListComponent implements OnInit {

  activeEmployee: any;
  employeeDialog: any;
  dataemployee: any ;
  contacts: Array<any>;

  private _unsubscribeAll: Subject<any>;

  constructor(  
                public dialog: MatDialog,
                private employeeService:  EmployeeService,
                private alertService: AlertService,) {
                
                this._unsubscribeAll = new Subject();
    
   }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe((res:any) =>{
      this.dataemployee = res.data;
    })
  }

  openDialog(data): void {
    const dialogRef  = this.dialog.open(AddEmployeeDialogComponent, {
      width: '300px',
      height: '500px',
      data: data
    });
    // this.employeeDialog.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.activeEmployee = result.data;
    //     this.employeeService.getEmployee()
    //       .pipe(takeUntil(this._unsubscribeAll))
    //       .subscribe((res: any) => {
    //         // console.log(res.data);
    //         this.alertService.showSuccess("บันทึกข้อมูลสำเร็จ")
    //         this.contacts = res.data;
    //       });
    //   }
    // });
    
  }


}
