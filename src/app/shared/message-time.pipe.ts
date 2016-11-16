import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'messageTime'
})
export class MessageTimePipe implements PipeTransform {


    transform(value: string, args: string[]): any {
        if (!value) return value;

        return value.replace(/\w\S*/g, function (txt) {

            let res = txt.split("T");
            let res1 = res[0].split("-")
            let res2 = res[1].split(":")

            // console.log(res)
            // console.log(res1)
            // console.log(res2)
            let inputDate = new Date();

            let year: number = parseInt(res1[0]);
            inputDate.setFullYear(year);
            let month: number = parseInt(res1[1]) - 1;
            inputDate.setMonth(month);
            let days: number = parseInt(res1[2])
            inputDate.setDate(days);

            let hours: number = parseInt(res2[0]);
            inputDate.setHours(hours);
            let minutes: number = parseInt(res2[1]);
            inputDate.setMinutes(minutes);
            let _seconds: number = parseInt(res2[2]);
            inputDate.setSeconds(_seconds);


            // get total seconds between the times
            // var delta = Math.abs(date_future - date_now) / 1000;
            // let delta = seconds;
            // // calculate (and subtract) whole days
            // let days = Math.floor(delta / 86400);
            // delta -= days * 86400;
            // // calculate (and subtract) whole hours
            // let hours = Math.floor(delta / 3600) % 24;
            // delta -= hours * 3600;
            // // calculate (and subtract) whole minutes
            // let minutes = Math.floor(delta / 60) % 60;
            // delta -= minutes * 60;
            // // what's left is seconds
            // let _seconds = delta % 60;  // in theory the modulus is not required


            let _now = new Date().getTime();
            //return d.getTime();
            let result: string = "";
            // time since message was sent in seconds
            let delta = (_now - inputDate.getTime()) / 1000;


            if (days > 0)
                result = `${days} dni ${hours} ur ${minutes} minut ${_seconds} sekund`;
            else if (hours == 0) {
                if (minutes == 0)
                    result = `${_seconds} sekund`;
                else
                    result = `${minutes} minut ${_seconds} sekund`;
            }
            else
                result = `${hours} ur ${minutes} minut ${_seconds} sekund`;
            //             return result;


            let strday: string = res1[2];
            if (strday.substring(0, 1) == "0") {
                strday = strday.substring(2, 1);
            }

            let strmonth: string = res1[1];
            switch (strmonth) {
                case "01":
                    strmonth = "Januar";
                    break;
                case "02":
                    strmonth = "Februar";
                    break;
                case "03":
                    strmonth = "Marec";
                    break;
                case "04":
                    strmonth = "April";
                    break;
                case "05":
                    strmonth = "Maj";
                    break;
                case "06":
                    strmonth = "Junij";
                    break;
                case "07":
                    strmonth = "Julij";
                    break;
                case "08":
                    strmonth = "Avgust";
                    break;
                case "09":
                    strmonth = "September";
                    break;
                case "10":
                    strmonth = "Oktober";
                    break;
                case "11":
                    strmonth = "November";
                    break;
                case "12":
                    strmonth = "December";
                    break;
            }


            // return res1[2] + '. ' + res1[1] + '. ' + res1[0] + '    ' + res2[0] + ':' + res2[1] + ':' + res2[2]; //+ ' - ' + result;
            return strday + '. ' + strmonth + ' ' + res2[0] + ':' + res2[1] + ':' + res2[2]; //+ ' - ' + result;
        });
    }

}



// import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { AsyncPipe } from '@angular/common';

// @Pipe({
//     name: 'messageTime',
//     pure: false
// })
// export class MessageTimePipe extends AsyncPipe implements PipeTransform {
//     value: Date;
//     timer: Observable<string>;

//     constructor(ref: ChangeDetectorRef) {
//         super(ref);
//     }

//     transform(obj: any, args?: any[]): any {
//         if (obj instanceof Date) {
//             this.value = obj;

//             if (!this.timer) {
//                 this.timer = this.getObservable();
//             }

//             return null; //super.transform(this.timer, args);
//         }

//         return null; //super.transform(obj, args);
//     }

//     private getObservable() {
//         return Observable.interval(1000).startWith(0).map(() => {
//             var result: string;
//             // current time
//             let now = new Date().getTime();

//             // time since message was sent in seconds
//             let delta = (now - this.value.getTime()) / 1000;

//             // format string
//             if (delta < 10) {
//                 result = 'jetzt';
//             }
//             else if (delta < 60) { // sent in last minute
//                 result = 'vor ' + Math.floor(delta) + ' Sekunden';
//             }
//             else if (delta < 3600) { // sent in last hour
//                 result = 'vor ' + Math.floor(delta / 60) + ' Minuten';
//             }
//             else if (delta < 86400) { // sent on last day
//                 result = 'vor ' + Math.floor(delta / 3600) + ' Stunden';
//             }
//             else { // sent more than one day ago
//                 result = 'vor ' + Math.floor(delta / 86400) + ' Tagen';
//             }
//             return result;
//         });
//     };
// }

// // import { isDate, NumberWrapper, isBlank } from '@angular/core/src/facade/lang';
// // import { Input, Component, OnInit, OnDestroy, LOCALE_ID } from '@angular/core';
// // import { DatePipe } from '@angular/common';

// // @Component({
// //     selector: 'time-ago',
// //     template: `{{timeago}}`
// // })
// // export class TimeAgo implements OnInit, OnDestroy {
// //     @Input() time: Date
// //     @Input() live: boolean = true
// //     @Input() interval: number = 60 * 1000
// //     @Input() maxPeriod: number = 365 * 24 * 60 * 60 * 1000
// //     @Input() afterMaxDateFormat: string = 'medium'
// //     @Input() suffix: string = 'ago'
// //     private timeago: string
// //     private timer: any

// //     transform(val) {
// //         this.timeago = this.getTimeAgo(val)
// //         if (this.live) {
// //             this.timer = setInterval(() => {
// //                 this.timeago = this.getTimeAgo(val)
// //             }, this.interval)
// //         }
// //     }

// //     getTimeAgo(val) {
// //         let diff: number = new Date().getTime() - new Date(val).getTime()

// //         if (diff > this.maxPeriod) {
// //             LOCALE_ID.toString
// //             let datePipe: DatePipe = new DatePipe(LOCALE_ID.toString())
// //             return datePipe.transform(val, this.afterMaxDateFormat)
// //         }

// //         let period: { [key: string]: number } = {
// //             second: 1000,
// //             minute: 60 * 1000,
// //             hour: 60 * 60 * 1000,
// //             day: 24 * 60 * 60 * 1000,
// //             week: 7 * 24 * 60 * 1000 * 60,
// //             month: 30 * 24 * 60 * 1000 * 60,
// //             year: 365 * 24 * 60 * 1000 * 60
// //         },
// //             i: string,
// //             j: string

// //         for (i in period) {
// //             if (diff < period[i]) {
// //                 return this.makeupStr(j || 'second', Math.round(diff / (period[j] || 1000)))
// //             }
// //             j = i
// //         }
// //         return this.makeupStr(i, Math.round(diff / period[i]))
// //     }

// //     makeupStr(unit: string, n: number) {
// //         return n + ' ' + unit + (n != 1 ? 's' : '') + ' ' + this.suffix
// //     }

// //     supports(obj: any): boolean {
// //         return isDate(obj) || NumberWrapper.isNumeric(obj)
// //     }

// //     ngOnInit() {
// //         if (this.timer) {
// //             clearInterval(this.timer)
// //         }
// //         if (isBlank(this.time)) {
// //             console.warn(`time property is required.`)
// //         } else if (!this.supports(this.time)) {
// //             console.error(`${this.time} isn't valid date format.`)
// //         } else {
// //             this.transform(this.time)
// //         }
// //     }

// //     ngOnDestroy() {
// //         if (this.timer) {
// //             clearInterval(this.timer)
// //         }
// //     }
// // }