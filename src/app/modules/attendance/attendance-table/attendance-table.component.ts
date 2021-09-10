import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-table',
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.scss']
})
export class AttendanceTableComponent implements OnInit {
  
certs:any;

  table: any = {
    displayedColumns:[
      "no",
      "date",
      "workIn",
      "workOut",
      "workTime"
    ],
    columns:[
      {
        "key":"no",
        "value":"ลำดับ"
      },
      {
        "key":"date",
        "value":"วันที่",
        "controlType":"datetime"
      },
      {
        "key":"workIn",
        "value":"เข้างาน",
        "controlType":"datetime"
      },
      {
        "key":"workOut",
        "value":"ออกงาน",
        "controlType":"datetime"
      },
      {
        "key":"workTime",
        "value":"เวลาการทำงาน",
        "controlType":"datetime"
      }
    ],
    menu:[
      "edit","download"
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
