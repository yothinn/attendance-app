import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';


@Component({
  selector: 'app-attendance-summary',
  templateUrl: './attendance-summary.component.html',
  styleUrls: ['./attendance-summary.component.scss']
})
export class AttendanceSummaryComponent implements OnInit {

  attendanceData: any;
  timeIn: any;
  timeOut: any;
  totalTime: any;
  test: number;

  constructor(private attendanceService: AttendanceService,) { }

  ngOnInit(): void {
    this.attendanceService.getAttendanceData().subscribe((res: any) => {
      this.attendanceData = res.data;
      console.log(this.attendanceData)
      this.findSum(this.attendanceData)
    })
  }



  findSum(data) {
    let workIn = data.filter(res => {
      return res.type === 'เข้างาน'

    })
    let workOut = data.filter(res => {
      return res.type === 'ออกงาน'

    })
    this.timeIn = workIn.map(res => res.time)
    console.log(this.timeIn)
    this.timeOut = workOut.map(res => res.time)
    console.log(this.timeOut)
    

    for (let i = 0; i < this.timeIn.length && i < this.timeOut.length; i++) {
       let timeIn  = new Date(this.timeIn[i])
       console.log(timeIn)
       let timeOut = new Date(this.timeOut[i])
       let total = timeOut.getTime() - timeIn.getTime()
       let hours = Math.floor(total / (60 * 60 * 1000))
       let minutes = Math.floor(total / (60 * 1000))  - (hours * 60);
       this.totalTime =  {hour: hours, minute: minutes}
       console.log(this.totalTime)
      //  let sum = [hours].reduce((a, b) => a + b, 0);
      // console.log(sum);
  

    }
  }


}
