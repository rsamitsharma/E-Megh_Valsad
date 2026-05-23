import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@source/environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  readonly rootUrl = environment.url;

  private count = 0;
  private spinner$ = new BehaviorSubject<string>("");
  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
    if (++this.count === 1) {
      this.spinner$.next("start");
    }
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner$.next("stop");
    }
  }

  resetSpinner() {
    this.count = 0;
    this.spinner$.next("stop");
  }

  UserLogin(userName: string, Password: string) {
    return this.http.get(`${this.rootUrl}/api/AccountController/GetUser?UserID=${userName}&Password=${Password}`);
  }

  GetUserByMobileNo(mobileNo: string) {
    return this.http.get(`${this.rootUrl}/api/AccountController/GetUserByMobileNo?mobileno=${mobileNo}`);
  }
}
