import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";

@Injectable()
export class ReqResInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private _Router: Router, private _AuthenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get("bypass") !== "true") this._AuthenticationService.requestStarted();
    const token: string = sessionStorage.getItem("userToken") || "";
    request = request.clone({ headers: request.headers.set("Authorization", "Bearer " + token) });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._AuthenticationService.requestEnded();
        }
        return event;
      }),
      catchError(error => {
        this._AuthenticationService.requestEnded();
        if (error.error.bypass == true) {
          return throwError(null);
        }
        switch (error.status) {
          case 401:
            this.toastr.error("Unauthorized", "Error");
            sessionStorage.clear();
            this._Router.navigate(["/dashboard"]);
            window.location.reload();
            break;
          case 404:
            this.toastr.info(error.error.message, "Info");
            break;

          default:
            this.toastr.error(error.error.message, "Error");
            break;
        }

        return throwError(error);
      })
    );
  }
}
