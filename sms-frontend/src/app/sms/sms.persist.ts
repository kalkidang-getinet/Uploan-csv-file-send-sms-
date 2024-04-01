import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { smsData } from './sms.model';

@Injectable({
    providedIn: 'root'
  })
  export class SMSPersist {
   
    constructor(
        private http: HttpClient,){}

    sendSms(): Observable<smsData> {
      console.log(environment.tcApiBaseUri)
        return this.http.get<smsData>(environment.tcApiBaseUri + "send-sms");
      }
  }