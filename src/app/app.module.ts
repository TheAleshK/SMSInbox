import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent, } from './app.component';
import { DataServiceService } from './shared/data-service.service';
import { MessageTimePipe } from './shared/message-time.pipe';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { setNickNameComponent } from './setnickname/setnickname.component';
import { sendSMSComponent } from './send-sms/send-sms.component';
import { AsyncDatePipe } from './shared/async-date.pipe';


import { enableProdMode } from '@angular/core';

let options: any = {
  animate: 'flyRight',
  positionClass: 'toast-top-right',
  maxShown: 1
};


//enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    MessageTimePipe,
    setNickNameComponent,
    sendSMSComponent,
    AsyncDatePipe
  ],
  entryComponents: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ToastModule.forRoot(options)
  ],
  providers: [
    DataServiceService,
    { provide: LOCALE_ID, useValue: "en-GB" }
    // { provide: WindowService, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
