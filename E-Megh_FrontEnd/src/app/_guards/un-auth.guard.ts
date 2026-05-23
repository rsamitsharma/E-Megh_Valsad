import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UnAuthGuard implements CanActivate {
  constructor(private _Router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const checkUser = sessionStorage.getItem("UserID");
    if (checkUser?.trim()) return this._Router.navigate(["/unified-dashboard"]);
    return !!!checkUser;
  }
}
