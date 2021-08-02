import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  login(body: any) {
    return this.http.post(`${environment.SERVER_URL}/api/auth/login`, body)
  }

  logout(body: any) {
    this.deleteUserInfo();
    return this.http.post(`${environment.SERVER_URL}/api/auth/logout`, body)
  }

  forgotPassword(body: any) {
    return this.http.post(`${environment.SERVER_URL}/api/auth/forgotpassword`, body);
  }

  resetPassword(resetToken: any, body: any): Observable<any> {
    return this.http.put(`${environment.SERVER_URL}/api/auth/resetpassword`, resetToken, body);
  }

  storeUserInfo(userId: string, username: string) {
    localStorage.setItem("salon-user-id", userId)
    localStorage.setItem("salon-username", username)
  }

  deleteUserInfo() {
    localStorage.removeItem("salon-user-id")
    localStorage.removeItem("salon-username")
  }

  getUserId() {
    return localStorage.getItem("salon-user-id")
  }

  getUsername() {
    return localStorage.getItem("salon-username")
  }

}
