import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Formbase } from 'src/app/shared/components/formbase/formbase';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';
import { Utils } from 'src/app/shared/utils';


@Component({
  selector: 'app-attendance-dialog',
  templateUrl: './attendance-dialog.component.html',
  styleUrls: ['./attendance-dialog.component.scss']
})
export class AttendanceDialogComponent implements OnInit {
  formBase: Formbase<string>[] = [];
  layout: any;
  form: FormGroup;
  work: Array<any> = [{ name: "เข้างาน" }, { name: "ออกงาน" }];
  status:boolean=true;


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
      map(layouts => { return layouts.filter(layout => layout.key === 'attendance1') })
    )
    .subscribe((layouts) => {
      this.layout = layouts[0];
      this.formBase = this.layout?.forms;
      console.log(this.data);
      this.form = this.formBaseService.toFormGroup(this.formBase, this.data.info);
      this.form.addControl('workIn',this.fb.control(this.data?.workIn || ''));
      this.form.addControl('workOut',this.fb.control(this.data?.workOut||''));
      this.form.addControl('type',this.fb.control(this.data?.type || ''));
    });
  }

  
  onClose() {
    this.dialogRef.close();
  }

//   onSubmit(): void {
//     let payLoad = this.form.getRawValue();
//     console.log(payLoad);
//       payLoad['id'] = this.data.info.customerId;
//       console.log(payLoad);

//      {this.attendanceService.createAttendance(payLoad).subscribe((res: any) => {
//          }) 
//      this.dialogRef.close(true);

//   }
// }

  // onSubmit(): void {
  //   let payLoad = this.form.getRawValue();
  //   // console.log(payLoad);
  //   payLoad['id'] = this.data.info.customerId;

  //   if (payLoad.type ==="เข้างาน"){
  //     this.attendanceService.createAttendance(payLoad).subscribe((res: any) => {
  //   }) 
  //       this.dialogRef.close(true)
  //   } 
  //   else {
  //     this.attendanceService.updateAttendance(this.data._id,payLoad).subscribe(res => {
  //       console.log(this.data);
       
  //     }) 
  //     this.dialogRef.close(true);
  //   }
  //  }

  //  onSubmit(): void {
  //   let payLoad = this.form.getRawValue();
  //   payLoad['id'] = this.data.info.customerId;  

  //   console.log(payLoad);
  //   if (this.data) {
  //     console.log(payLoad)
  //     this.attendanceService.createAttendance(payLoad).subscribe((res: any) => {
  //     this.dialogRef.close(res);
  //     console.log()
  //     })
  //   }  
  //   else {
  //     this.attendanceService.updateAttendance(this.data[0].info._id,payLoad).subscribe(res => {
  //       console.log(res);
  //       this.dialogRef.close(res);
  //     })
      
  //   }

  // }

  onSubmit(): void {
    let payLoad = this.form.getRawValue();
    // payLoad['id'] = this.data.info.customerId;  

    console.log(payLoad);
    console.log(this.data)

    if (payLoad.type ==="เข้างาน") {

      console.log(payLoad);
      this.attendanceService.createAttendance(payLoad).subscribe((res: any) => {
        this.dialogRef.close(res);

      })
    } else {
      this.attendanceService.updateAttendance(this.data.info._id,payLoad).subscribe(res => {
        console.log(res);
        this.dialogRef.close(res);
      })
    }

  }

  onSelectWorkIn(){
    this.status = true;
    // console.log(this.status)
  }

  onSelectWorkOut(){
    this.status = false;
    // console.log(this.status)
  }

  onSelect(item){
    console.log(item)
    if(item.name==="เข้างาน"){
      this.onSelectWorkIn()
    }
    else{
      this.onSelectWorkOut()
    }
  }



}
