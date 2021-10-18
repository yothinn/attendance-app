import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/alert.service';
import { AttendanceService } from 'src/app/services/attendance.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';
import { sortAndDeduplicateDiagnostics } from 'typescript';
import { AddEmployeeDialogComponent } from '../employee/add-employee-dialog/add-employee-dialog.component';
import { AttendanceDialogComponent } from './attendance-dialog/attendance-dialog.component';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('searchContact') searchRef: ElementRef;
  @ViewChild('contactList') employeeRef: ElementRef;
  attendanceData: any;
  employeeData: any;
  test = environment.apiUrl + "/api/";

  employeeList: Array<any>;
  activeEmployee: any;

  currentTabIndex: number = 0;
  currentPage = 1;
  getDataAttendance:any;


  // number of data that loaded
  readonly PAGESIZE = 5;
  // number of activity that showed
  readonly SHOWACNUM = 2;

  isSearching: boolean = false;


  private _unsubscribeAll: Subject<any>;



  constructor(public dialog: MatDialog,
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.loadEmployee();
      // this.employeeService.getEmployee().subscribe((res: any) => {
      // this.employeeData = res.data;
      // })
      this.attendanceService.getDataAttendance().subscribe((res: any) => {
        this.getDataAttendance = res.data.type;
        console.log(this.getDataAttendance)
      });

   
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ref.detectChanges();
  }

  ngAfterViewInit(): void {
    this.onSearchEmployeeEvent();
    this.onScrollEmployeeList();
  }

  openAttendanceDialog(data): void {
    console.log();
    const dialogRef = this.dialog.open(AttendanceDialogComponent, {
      width: '300px',
      height: '500px',
      data: {        
        isNew: true,
        // info:data
        info: {
          // dateTime:  new Date(Date.now()),
          // workIn:new Date(Date.now()),
          workOut:new Date(Date.now()),
          // customerId: this.activeEmployee._id,
          // contact: `${this.activeEmployee.firstName} ${this.activeEmployee.lastName} `,
          no: '---------- AUTO GEN ----------'
        },
      } 
    });
  }



  openDialogAddEmployeeDialog(data): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '300px',
      height: '500px',
      data: data
    });
  }

  loadEmployee() {
    this.employeeService.getEmployees(this.currentPage)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (this.currentPage === 1) {
          this.employeeList = res.data;
        } else {
          if (res.data.length > 0) {
            this.employeeList = this.employeeList.concat(res.data);
          }

        }
      });
  }

  onScrollEmployeeList() {
    let scrollContact$ = fromEvent(this.employeeRef.nativeElement, 'scroll').pipe(
      debounceTime(300),
      filter((v: any) => {
        let maxPos = v.target.scrollHeight;
        let curPos = v.target.scrollTop + v.target.offsetHeight;
        return (curPos >= (maxPos - 10));
      })
    );

    scrollContact$.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((v: any) => {
        console.log(v);
        this.currentPage++;
        this.loadEmployee();
      });
  }

  onSearchEmployeeEvent() {
    let typeahead = fromEvent(this.searchRef.nativeElement, 'input').pipe(
      map((e: KeyboardEvent) => {
        this.isSearching = true;
        return (e.target as HTMLInputElement).value
      }),
      filter(text => text.length >= 3),
      debounceTime(300),
      distinctUntilChanged(),
      // send request to search user
      tap(n => console.log(n)),
      switchMap(name => this.employeeService.searchEmployee(name))
    );

    typeahead.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        v => {
          // TODO: update contact
          console.log(v);
          this.employeeList = v.data;
        },
        err => {
          console.log('contact searching error');
        }
      );
  }

  cancelSearch(): void {
    console.log('cancel search');
    this.isSearching = false;
    this.searchRef.nativeElement.value = '';

    // Reload contact
    this.loadEmployee();

  }

  chooseContact(data): void {
    this.activeEmployee = data;
    console.log(data)
  }



}
