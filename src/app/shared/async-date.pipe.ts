import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'asyncDate',
  template: `
    <div style="display:inline-block; font-size:11px; padding-left: 10px;">
      {{dateAgo}}
    </div>
  `
})
export class AsyncDatePipe {

  dateAgo: string;
  // counter$: Observable<number>;
  // dateAgo$: Observable<string>;
  // even$: Observable<boolean>;
  // people$: Observable<any>;
  // person$: Observable<any>;
  // data: any;
  @Input() inputDate: string;



  constructor() {



  }

  ngOnInit() {

    this.dateAgo = this.timeAgo(this.inputDate);

    if (this.secondsAgo(this.inputDate) < 86400) {
      Observable.interval(1000)
        .subscribe((x) => {
          this.dateAgo = this.timeAgo(this.inputDate);
          // console.log(this.secondsAgo(this.inputDate));
        });
    }
  }

  secondsAgo(myDate: string): number {

    let res = myDate.split("T");
    let res1 = res[0].split("-");
    let res2 = res[1].split(":");
    let tmpDate = new Date();
    let year: number = parseInt(res1[0]);
    tmpDate.setFullYear(year);
    let month: number = parseInt(res1[1]) - 1;
    tmpDate.setMonth(month);
    let days: number = parseInt(res1[2])
    tmpDate.setDate(days);
    let hours: number = parseInt(res2[0]);
    tmpDate.setHours(hours);
    let minutes: number = parseInt(res2[1]);
    tmpDate.setMinutes(minutes);
    let _seconds: number = parseInt(res2[2]);
    tmpDate.setSeconds(_seconds);
    let _now = new Date().getTime();
    let delta = (_now - tmpDate.getTime()) / 1000;
    return delta;
  }

  timeAgo(myDate: string): string {

    let res = myDate.split("T");
    let res1 = res[0].split("-");
    let res2 = res[1].split(":");
    let tmpDate = new Date();
    let year: number = parseInt(res1[0]);
    tmpDate.setFullYear(year);
    let month: number = parseInt(res1[1]) - 1;
    tmpDate.setMonth(month);
    let days: number = parseInt(res1[2])
    tmpDate.setDate(days);

    let hours: number = parseInt(res2[0]);
    tmpDate.setHours(hours);
    let minutes: number = parseInt(res2[1]);
    tmpDate.setMinutes(minutes);
    let _seconds: number = parseInt(res2[2]);
    tmpDate.setSeconds(_seconds);


    let _now = new Date().getTime();
    //return d.getTime();
    let result: string = "";
    // time since message was sent in seconds
    let delta = (_now - tmpDate.getTime()) / 1000;


    // get total seconds between the times
    // var delta = Math.abs(date_future - date_now) / 1000;
    // let delta = seconds;
    // calculate (and subtract) whole days
    days = Math.floor(delta / 86400);
    delta -= days * 86400;
    // calculate (and subtract) whole hours
    hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    // calculate (and subtract) whole minutes
    minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    // what's left is seconds
    _seconds = Math.floor(delta % 60);  // in theory the modulus is not required

    if (days > 0)
      result = `pred ${days} dni ${hours} ur ${minutes} minut ${_seconds} sekund`;
    else if (hours == 0) {
      if (minutes == 0)
        result = `pred ${_seconds} sekund`;
      else
        result = `pred ${minutes} minut ${_seconds} sekund`;
    }
    else
      result = ` pred ${hours} ur ${minutes} minut ${_seconds} sekund`;
    //             return result;

    return result;

  }

}

