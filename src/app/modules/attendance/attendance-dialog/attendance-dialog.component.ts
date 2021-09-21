import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Formbase } from 'src/app/shared/components/formbase/formbase';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';


@Component({
  selector: 'app-attendance-dialog',
  templateUrl: './attendance-dialog.component.html',
  styleUrls: ['./attendance-dialog.component.scss']
})
export class AttendanceDialogComponent implements OnInit {
  formBase: Formbase<string>[] = [];
  layout: any;
  form: FormGroup;

  private _unsubscribeAll: Subject<any>;
  constructor(private attendanceService: AttendanceService,
              public dialogRef: MatDialogRef<AttendanceDialogComponent>,
              private fb: FormBuilder,
              private formBaseService: FormbaseService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) {this._unsubscribeAll = new Subject();}

              ngOnDestroy(): void {
                this._unsubscribeAll.next();
                this._unsubscribeAll.complete();
              }
          

  ngOnInit(): void {
    this.formBaseService.layoutChangedObservable$
    .pipe(
      takeUntil(this._unsubscribeAll),
      map(layouts => { return layouts.filter(layout => layout.key === 'attendances') })
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
      payLoad['id'] = this.data.info.customerId;
      console.log(payLoad);
      this.attendanceService.createAttendance(payLoad).subscribe((res: any) => {
         }) 
     this.dialogRef.close(true);

  }



}
