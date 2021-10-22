import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  employeeData: any;
  @Input() employees: any; 
  avatarDefault = `${environment.apiUrl}/api/` + "uploads/employees/user-1632299889161.png";
  cloud = `${environment.apiUrl}/api/`;

  private _unsubscribeAll: Subject<any>;
  constructor( private employeeService: EmployeeService,
    ) {
      this._unsubscribeAll = new Subject();
    }

  
    ngOnInit(): void {

     
    }
  

} 

