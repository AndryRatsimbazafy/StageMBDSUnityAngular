import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) {
  }

  sendEmail(mail: any) {
    return this.httpClient
      .post(
        `${environment.SERVER_URL}/api/users/sendEmail`,
        mail
      );
  }
}
