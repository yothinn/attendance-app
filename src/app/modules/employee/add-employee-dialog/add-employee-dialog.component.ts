import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Formbase } from 'src/app/shared/components/formbase/formbase';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit {
  formBase: Formbase<string>[] = [];
  form: FormGroup;
  layout: any;
  private _unsubscribeAll: Subject<any>;

  constructor(private employeeService:  EmployeeService,
              public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
              private fb: FormBuilder,
              private formBaseService: FormbaseService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              
    ) { 
      this._unsubscribeAll = new Subject();

    }

    ngOnDestroy(): void {
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }

  ngOnInit(): void {
    this.formBaseService.layoutChangedObservable$
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(layouts => { return layouts.filter(layout => layout.key === 'employees') })
      )
      .subscribe((layouts) => {
        console.log(layouts)
        this.layout = layouts[0];
        this.formBase = this.layout?.forms;
        console.log(this.data);
        this.form = this.formBaseService.toFormGroup(this.formBase, this.data);
      
      });
  }



  onClose() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let payLoad = this.form.getRawValue();

    console.log(payLoad);

    if (!this.data) {

      console.log(payLoad);
      this.employeeService.createEmployee(payLoad).subscribe((res: any) => {
        this.dialogRef.close(res);
      })
    } else {
      this.employeeService.updateEmployee(this.data._id,payLoad).subscribe(res => {
        console.log(res);
        this.dialogRef.close(res);
      })
    }

  }

}
