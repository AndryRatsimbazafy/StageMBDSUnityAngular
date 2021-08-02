import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(private httpClient: HttpClient) {
  }

  get() {
    return this.httpClient
      .get(
        "https://dashboard.w3dsalonvituelreno2021.fr/api/unity/timer"
      );
  }
}
