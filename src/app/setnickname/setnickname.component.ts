// import { Component, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Component, Input, Output, AfterViewChecked, ViewChild, EventEmitter } from '@angular/core';


@Component({
  selector: 'setnickname',
  templateUrl: './setnickname.component.html',
  styleUrls: ['./setnickname.component.scss']
})
export class setNickNameComponent implements AfterViewChecked {

  @Input() message = {};
  @Input() modalVisible: boolean = false;
  @Output() nickNameChange = new EventEmitter();
  @ViewChild('nickname') nickname;

  characterCount: number = 0;

  constructor() {

  }

  ngAfterViewChecked() {
    //this.nickname.focus();
  }

  setNickName(nickname) {

    //TODO REMOVE THIS
    if (nickname == '') return;
    this.modalVisible = false;
    this.nickNameChange.emit({ value: nickname })

  }


}
