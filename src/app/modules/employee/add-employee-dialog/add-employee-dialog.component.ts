import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { forkJoin, of, Subject } from 'rxjs';
import { concatMap, map, takeUntil } from 'rxjs/operators';
import { Formbase } from 'src/app/shared/components/formbase/formbase';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UploadService} from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit {
  readonly UPLOADSUB_EMOLOYEE = "employees";

  formBase: Formbase<string>[] = [];
  form: FormGroup;
  layout: any;

  isNew:boolean;
  isChangeImage:boolean;
  imageFile:any;
  image: any;
  default:any = "uploads/employees/user-1632299889161.png"; 

  @Input() employees: any; 
  // test =  environment.apiUrl + "/api/";

  private _unsubscribeAll: Subject<any>;

  constructor(private employeeService:  EmployeeService,
              public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
              private fb: FormBuilder,
              private formBaseService: FormbaseService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private uploadService: UploadService,
              
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
        // console.log(this.data);
        this.form = this.formBaseService.toFormGroup(this.formBase, this.data.info);
      
      });
      console.log(this.data);
    if (this.data.info === "") {
      this.isNew = true;
      this.image = `${environment.apiUrl}/api/` + this.default;
    } else {
      this.isNew = false;
      this.image = this.data.info?.imageUrl?.src || this.default;
    }
    
    this.isChangeImage = false;
  }



  onClose() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let payload = this.form.getRawValue();
    console.log(payload);
    // console.log(this.data.info.customerId);

    let upload$;
    let delete$;
    
    if (this.isChangeImage) {

      if (this.data.info.imageUrl) {
        delete$ = this.uploadService.deleteFile('employees', this.data.info.imageUrl.name);
      } else {
        delete$ = of({});
      }
      const formData = new FormData();
      formData.append('file', this.imageFile);
      console.log(this.isChangeImage);
      upload$ = this.uploadService.uploadFile(this.UPLOADSUB_EMOLOYEE, formData) ;
      console.log(upload$)
    } else {
      upload$ = of({});
      delete$ = of({});
      console.log(upload$)
    }
    forkJoin({
      delete: delete$,
      upload: upload$ 

    }).pipe(
      takeUntil(this._unsubscribeAll),
      concatMap((result: any) => {
        console.log(result);
        if (this.data.info === "") {
          // console.log('create');
          payload['id'] = this.data.info.customerId;
          payload['imageUrl'] = result.upload;
          return this.employeeService.createEmployee(payload);
        } else {
          if (this.isChangeImage) {
            payload['imageUrl'] = result.upload;
          }
          return this.employeeService.updateEmployee(this.data.info._id, payload);
        }
      }),
      
              ).subscribe(res => {
                console.log(res);
                this.dialogRef.close(true);
              })
  }

  onFileUpload(event) {
    const file = event.target.files[0];
    // console.log(files);

    let maxSize = environment.maxupload;         // size in MB
    let fileSize = file.size / 1024 / 1024            // convert to MB

    if (fileSize >= maxSize) {
      // TODO : how to manage error !!!!
      throw new Error(`File Size is too large. Allowed file size is ${maxSize}MB`);
    }

    this.isChangeImage = true;
    this.imageFile = file;

    let fileReader = new FileReader();
    fileReader.onload = (event) => {
      this.image = fileReader.result;
      console.log(this.image);
    };
    fileReader.readAsDataURL(file);
  }

  displayImage() {
    if (this.isNew) {
      return this.image;
    } else {
      return (this.isChangeImage) ? this.image : `${environment.apiUrl}/api/${this.image}`  ;
    }
  }

}
