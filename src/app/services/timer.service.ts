import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(private httpClient: HttpClient) {
  }

  get() {
    return this.httpClient
      .get(
        `${environment.SERVER_URL}/api/unity/timer`
      );
  }
}
