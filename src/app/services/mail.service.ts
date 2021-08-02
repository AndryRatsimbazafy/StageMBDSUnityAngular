import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) {
  }

  sendEmail(mail: any) {
    return this.httpClient
      .post(
        "https://dashboard.w3dsalonvituelreno2021.fr/api/users/sendEmail",
        mail
      );
  }
}
