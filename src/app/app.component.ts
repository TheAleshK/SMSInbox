import { LOCALE_ID, Component, ViewChild, ViewContainerRef, OnInit, EventEmitter } from '@angular/core';
import { MdSidenav, MdDialog, MdDialogConfig, MdInput, MdTooltip } from "@angular/material";
import { DataServiceService } from './shared/data-service.service';
import { setNickNameComponent } from './setnickname/setnickname.component';
import { sendSMSComponent } from './send-sms/send-sms.component';

// import { messageTimePipe } from './shared/message-time.pipe';
// import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
// import { TimeAgo } from 'ng2-timeago';
// import { FocusDirective } from './shared/focus.directive';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Rx';


import * as myGlobals from '../globals';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent implements OnInit {

  @ViewChild('leftnav') leftnav: MdSidenav;
  @ViewChild('rightnav') rightnav: MdSidenav;
  @ViewChild('setnickname') setnickname: setNickNameComponent;
  @ViewChild('sendSMS') sendSMS: sendSMSComponent;


  ticks: any;
  lastId: number = 0;
  tmplastId: number = 0;
  progressVisible: boolean = true;
  currentMessage = {};
  time: Date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)

  messages = [];
  tmpmessages = [];
  messagesOut = [];
  tmpmessagesOut = [];

  newmessages: number = 0;
  recordsize: number = 100;
  isDarkTheme: boolean = false;
  currentdate = new Date();


  //will start after 2 seconds and then ticks every second
  timer1 = Observable.timer(10000, 30000);
  timer2 = Observable.timer(1000, 1000);

  // datetime = "Last Sync: " + currentdate.getDate() + "/"
  //               + (currentdate.getMonth()+1)  + "/" 
  //               + currentdate.getFullYear() + " @ "  
  //               + currentdate.getHours() + ":"  
  //               + currentdate.getMinutes() + ":" 
  //               + currentdate.getSeconds();


  constructor(public toastr: ToastsManager, private _dataService: DataServiceService, public dialog: MdDialog, public vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(this.vcr); //NEDDED

  }


  ngOnInit() {

    this.progressVisible = false;
    this.getData();


    this.timer1.subscribe(this.getData.bind(this));
    this.timer2.subscribe(t => this.ticks = this.formatSeconds(t));


    //toastr event click
    this.toastr.onClickToast()
      // .take(1)
      .subscribe(toast => {
        if (toast.data && toast.data) {
          console.log(toast.data);
          this.toastr.dismissToast(toast);

          if (toast.data["id"] == -1)
            this.refreshMessages();
          else
            this.setDeleted(toast.data);

        }
      });


  }

  logOut() {
    window.location.replace('http://www.smscity.net/top.asp?odjava=1');
  }

  switchSMSCity() {
    window.location.replace('http://www.smscity.net/index.asp');
  }

  formatSeconds(seconds: number) {
    // get total seconds between the times
    // var delta = Math.abs(date_future - date_now) / 1000;
    let delta = seconds;
    // calculate (and subtract) whole days
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;
    // calculate (and subtract) whole hours
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    // calculate (and subtract) whole minutes
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    // what's left is seconds
    let _seconds = delta % 60;  // in theory the modulus is not required

    if (days > 0)
      return `${days} dni ${hours} ur ${minutes} minut ${_seconds} sekund`;
    else if (hours == 0) {
      if (minutes == 0)
        return `${_seconds} sekund`;
      else
        return `${minutes} minut ${_seconds} sekund`;
    }
    else
      return `${hours} ur ${minutes} minut ${_seconds} sekund`;

    // return returned

  }

  getData() {

    this._dataService.getMessagesInOut(this.recordsize).subscribe(
      // the first argument is a function which runs on success
      data => {

        // ČE IMAMO MESSAGE OUT  
        if (data[1].data.length > 0) {
          this.messagesOut = data[1].data;
        }

        //ČE IMAMMO MESSAGE IN
        if (data[0].data.length > 0) {
          //console.log(data[0].data);
          //console.log(data[0].data);

          // RELOAD
          if (this.tmpmessages.length > 0) {

            this.tmpmessages = data[0].data;
            this.newmessages = 0;

            for (var idx in this.tmpmessages) {
              if (this.lastId < this.tmpmessages[idx]["id"]) {
                this.newmessages++;
              }
              else
                break;
            }
            if (this.newmessages > 0)
              this.toastr.success('Klikni za prikaz ...', 'Nova sporočila:    ' + this.newmessages.toString() + '', { toastLife: 5000, dismiss: 'auto', data: { id: -1 } });

          }
          else {

            //LOAD

            // for (var idy in data[0].data) {
            //   console.log(this.transformText(data[0].data[idy]["vsebina"]));
            //   data[0].data[idy]["vsebina"] = this.transformText(data[0].data[idy]["vsebina"]);
            // }

            this.messages = data[0].data;
            this.tmpmessages = data[0].data;
            this.messagesOut = data[1].data;
            this.lastId = this.tmpmessages[0]["id"];
            this.tmplastId = this.lastId;
          }


          //MERGAMO POSLANE JSON V PREJETE JSON IN HKRATI NAREDIMO SE TRANSFORMACIJO

          // let t0 = performance.now();

          for (var idy in this.messages) {
            let myArr = [];

            for (var idx in this.messagesOut) {
              if (this.messages[idy]["id"] == this.messagesOut[idx]["prejetsmsid"]) {
                myArr.push({ vsebina: this.messagesOut[idx]["vsebina"], datum: this.messagesOut[idx]["datum"] });
              }
            }
            if (myArr.length > 0) {
              this.messages[idy]["poslani"] = myArr;
            }
          }

          // let t1 = performance.now();
          // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

        }
      },
      // the second argument is a function which runs on error
      err => {
        //this.toastrService.error('Ni povezave s strežnikom'); 
        this.toastr.error('Prijavite se v SMSCity ...', 'Ni povezave s strežnikom', { toastLife: 7000 });

      },
      // the third argument is a function which runs on completion
      () => {
        console.log('done loading!!');
      }
    );


  }

  setColor(color, message) {
    // console.log(color + ':' +message)
    message.barva = color;
    this._dataService.setMessageColor(message).subscribe(
      // the first argument is a function which runs on success
      data => { console.log(data); },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => { this.toastr.success('Barva spremenjena', 'Ok', { toastLife: 1000 }); }
    );
  }

  sendMessage(message) {

    if (message == '') return

    this.currentMessage["PoslanaVsebina"] = message;
    this._dataService.sendMessage(this.currentMessage).subscribe(
      // the first argument is a function which runs on success
      data => { console.log(data); },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => {
        { this.toastr.success(message.substring(0, 60) + ' ...', 'SMS uspešno poslan !!!', { toastLife: 7000 }); }
        // this.currentMessage.poslani.push({ vsebina: message , datum: getCurrentDate });
      }

    );
  }

  setNickName(nickname) {

    this.currentMessage["nickname"] = nickname;

    //GO THROUGH ARRAY AND SET NICKNAME TO ALL PosiljateljId
    let posiljateljid = this.currentMessage["posiljateljid"];
    for (var idx in this.messages) {
      if (this.messages[idx]["posiljateljid"] == posiljateljid) {
        this.messages[idx]["nickname"] = nickname;
      }
    }

    this._dataService.setNickName(this.currentMessage).subscribe(
      // the first argument is a function which runs on success
      data => { console.log(data); },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => {
        { this.toastr.success('Številka uspešno poimenovana!', 'Ok', { toastLife: 3000 }); }
      }

    );
  }

  setDeleted(message) {


    for (var i = 0; i < this.messages.length; i++) {
      if (this.messages[i]['id'] == message.id) {
        this.messages.splice(i, 1);
      }
    }

    this._dataService.setDeleted(message).subscribe(
      // the first argument is a function which runs on success
      data => { console.log(data); },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => {
        this.toastr.success('Sporočilo brisano', 'Ok', { toastLife: 1000 });
      }
    );
  }

  filterColor(color) {
    if (color == 'color4') {
      this.messages = this.tmpmessages;
      return
    }

    this.messages = this.tmpmessages.filter(function (el) {
      //return el.price <= 1000 && el.sqft >= 500 && el.num_of_beds >=2 && el.num_of_baths >= 2.5;
      return el.barva == color;
    });
  }

  warnDeleted(message) {

    this.toastr.error(message.vsebina.substring(0, 60) + ' ...', 'Kliknite za brisanje sporočila ', { toastLife: 5000, dismiss: 'auto', data: { id: message.id } });

  }

  openDialog(message) {
    this.currentMessage = message;
    this.setnickname.modalVisible = true;
  }

  openDialog1(message) {
    this.currentMessage = message;
    this.sendSMS.modalVisible = true;
  }

  refreshMessages() {

    if (this.newmessages == 0) return;
    this.newmessages = 0;
    this.messages = this.tmpmessages;
    this.tmplastId = this.lastId;
    this.lastId = this.messages[0]["id"];

    let timer = Observable.timer(30000);
    timer.subscribe(t => {
      console.log(this.tmplastId + " " + this.lastId);
      this.tmplastId = this.lastId;
      // timer.un
    });

    // setTimeout(function () {
    //   console.log(this.tmplastId + " " + this.lastId);
    //   this.tmplastId = this.lastId;
    // }, 10000);
  }

  showHelp() {
    // this.currentMessage = message;
    // this.leftnav.open();
    this.rightnav.open();
  }

}

    // getCurrentDate() {

    //     let today: string="";
    //     let currentDate = new Date();
    //     let dd: number = currentDate.getDate();
    //     let mm: number = currentDate.getMonth()+1; //January is 0!
    //     let yyyy: number = currentDate.getFullYear();

    //     // if(dd<10) {
    //     //     dd = '0'+ dd;
    //     // } 

    //     // if(mm<10) {
    //     //     mm='0' + mm
    //     // } 

    //     today = mm+'/'+dd+'/'+yyyy;

    //     return today  

    // }
