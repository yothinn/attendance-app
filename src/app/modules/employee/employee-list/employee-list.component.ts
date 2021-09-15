import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/alert.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {
  @ViewChild('search') searchEle: ElementRef;

  activeEmployee: any;
  employeeDialog: any;
  employeeData: any ;
  contacts: Array<any>;
  filterList: any[];

  private _unsubscribeAll: Subject<any>;

  constructor(  
                public dialog: MatDialog,
                private employeeService:  EmployeeService,
                private alertService: AlertService,) {
                
                this._unsubscribeAll = new Subject();
    
   }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe((res:any) =>{
      this.employeeData = res.data;
      this.filterList =  this.employeeData
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

  onSearch(event): void {
    let filter = this.searchEle.nativeElement.value.toLowerCase();
     this.employeeService.searchEmployee(filter)
      .subscribe((res) => {
        console.log(res);
        this.filterList = res.data;
      })
  }


}
