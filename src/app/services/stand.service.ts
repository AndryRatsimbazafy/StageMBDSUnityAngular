import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StandService {

  constructor(private httpClient: HttpClient) { }

  fetchDataApiServer() {
    return this.httpClient
      .get(
        "https://dashboard.w3dsalonvituelreno2021.fr/api/unity/assets"
      );
  }

  getUserById(id) {
    return this.httpClient
      .get(
        "https://dashboard.w3dsalonvituelreno2021.fr/api/unity/exposant/" + id
      );
  }


  sendUserDataApiServer(gameObjectId: any, visitorId: any) {
    return this.httpClient
      .post(
        "https://dashboard.w3dsalonvituelreno2021.fr/api/rooms/visitors",
        { gameObjectId, visitorId }
      );
  }

  fetchDataHall() {
    return this.httpClient
      .get(
        "https://dashboard.w3dsalonvituelreno2021.fr/api/unity/hall"
      );
  }

  fetchDataCoaching() {
    return this.httpClient
      .get(
        "https://dashboard.w3dsalonvituelreno2021.fr/api/unity/coach"
      );
  }

  fetchDataApiLocal() {
    return this.httpClient
      .get(
        "http://localhost:3001/data"
      );
  }

  fetchDataLocal() {
    var _jsonURL = 'assets/salon.json';
    return this.httpClient
      .get(_jsonURL);
  }

  fetchDataLocalHall() {
    var _jsonURL = 'assets/hall.json';
    return this.httpClient
      .get(_jsonURL);
  }

  fetchDataLocalCoaching() {
    var _jsonURL = 'assets/coaching.json';
    return this.httpClient
      .get(_jsonURL);
  }
}
