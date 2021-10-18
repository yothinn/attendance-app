

export class Attendance {

    public type: string;
    public dateTime: Date;
    private timeIn: any;
    private timeOut: any;
    public totalTime: any;
    public timeData:any;

    get worksIn(): any {
        if (this.type === 'เข้างาน') {
            return this.dateTime;
        } else {
            return null;
        }
    }

    get worksOut(): any {
        if (this.type === 'ออกงาน') {
            return this.dateTime;
        } else {
            return null;
        }

    }

    set time(data:any){
        this.timeData = data
        console.log(  this.timeData)
    }

    get workTime():any{
        return this.totalTime;
    }

    findSum(data) {
        let worksIn = data.filter(res => {
            return res.type === 'เข้างาน'

        })
        let worksOut = data.filter(res => {
            return res.type === 'ออกงาน'

        })
        this.timeIn = worksIn.map(res => res.dateTime)
        this.timeOut = worksOut.map(res => res.dateTime)

        for (let i = 0; i < this.timeIn.length && i < this.timeOut.length; i++) {

            let timeIn = new Date(this.timeIn[i])
            let timeOut = new Date(this.timeOut[i])
            let total = timeOut.getTime() - timeIn.getTime()
            let days = Math.floor(total / (60 * 60 * 24 * 1000));
            let hours = Math.floor(total / (60 * 60 * 1000)) - (days * 24);
            let minutes = Math.floor(total / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
            return this.totalTime = {day: days, hour: hours, minute: minutes}
          

        }  


    }


    

}