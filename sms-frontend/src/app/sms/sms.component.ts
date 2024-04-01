import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SMSPersist } from './sms.persist';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent {

  constructor(
  public smsPersist:SMSPersist,
  ){}

  uploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
  });
  errorMessage = '';
  successMessage = '';
   message:String = "This is sms message ";

  uploadFile(event: any) {
    this.errorMessage = '';
    this.successMessage = '';
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      console.log("hear  ****2 ")
      const file = event.target.files[0];
      reader.readAsText(file);
      reader.onload = () => {
        try {
          this.validateFile(reader.result as string);
          console.log("files " , reader.result)
         
          this.smsPersist.sendSms().subscribe(value => {
           }, error => {
           
          })
          
          this.successMessage = 'SMS File uploaded successfully!';
        } catch (error) {
         this.errorMessage = "Invalid data in row";
        }
      };
      reader.onerror = (error) => {
        // this.errorMessage = error.;
      };
    }
  }

  validateFile(data: string) {
    const rows = data.split('\n');
    const headers = rows[0].split(',');
    if(headers[0].trim() !== 'name' || headers[1].trim() !== 'phone'){

      throw new Error('Invalid file format.');
    }
    console.log(rows.length)
    for (let i = 1; i < rows.length - 1; i++) {
      const row = rows[i].split(',');
      if (row.length !== 2 || !row[0].trim() || !this.validatePhoneNumber(row[1].trim())) {
        throw new Error(`Invalid data in row ${i+1}`);
      }
    }
  }

  validatePhoneNumber(phone_umber: string) {
    return phone_umber.length >= 9 && /^\d+$/.test(phone_umber) ;
  }



}