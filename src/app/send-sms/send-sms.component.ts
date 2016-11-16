// import { Component, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Component, Input, Output, AfterViewChecked, ViewChild, EventEmitter } from '@angular/core';


@Component({
  selector: 'sendSMS',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.scss']
})
export class sendSMSComponent implements AfterViewChecked {

  @Input() message = {};
  @Input() modalVisible: boolean = false;
  @Output() newmessageChange = new EventEmitter();
  @ViewChild('newmessage') newmessage;

  characterCount: number = 0;

  constructor() {

  }

  ngAfterViewChecked() {
    this.newmessage.nativeElement.focus();
  }

  sendMessage(message) {

    if (message == '') return;
    this.modalVisible = false;
    this.newmessageChange.emit({ value: message })

  }

  validateText(element) {
    let res: string = element.value.replace(/[^a-zA-Z1234567890*/+-;:?!., ÁáÉéÍíÓóÖöŐőÚúÜüŰű]+/igm, "");
    element.value = res.substr(0, 160);
    this.characterCount = element.value.length;
  }

}
