/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { ChangeDetectorRef, Component, inject, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { GlobalService, MasterService } from "./_services";
import { NavigationStart, Router } from "@angular/router";
import { AuthenticationService } from "./_services/authentication.service";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [trigger("indicatorRotate", [state("collapsed", style({ transform: "rotate(0deg)" })), state("expanded", style({ transform: "rotate(180deg)" })), transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4,0.0,0.2,1)"))])],
})
export class AppComponent implements OnInit {
  constructor(private _MasterService: MasterService, private _Router: Router, private _AuthenticationService: AuthenticationService, private cdRef: ChangeDetectorRef, public breakpointObserver: BreakpointObserver, private router: Router, public _GlobalService: GlobalService) { }

  ngOnInit(): void {
    console.log(this._GlobalService.AdminLoggedIn);

    this.defaultChanges();
    this.GetWhetherData();
    this.breakpointObserver.observe(["(min-width: 750px)"]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.drawer.open();
        this.HideCommonView = false;
      } else {
        this.drawer.close();
        this.HideCommonView = true;
      }
    });

  }

  // #region Variable
  WeatherData: any;
  @ViewChild("drawer") drawer!: MatSidenav;
  showSpinner: boolean = false;
  hideCommonView: boolean = false;
  isExpandedMenu: boolean = true;
  HideCommonView = true;
  isMobileView: boolean = false;

  masterMenuList: any[] = [];
  userMenuList: any[] = [];
  ReFormatedMenus: any[] = [];
  deprecatedPagesForUI: string[] = ["/", "/login"];
  userInfo: Int_UserInfo = {
    name: "",
    username: "",
    uid: "",
    usertype: "",
  };
  count = 0;

  // #endregion

  defaultChanges() {
    this._AuthenticationService.getSpinnerObserver().subscribe(status => {
      this.showSpinner = status === "start";
      this.cdRef.detectChanges();
    });
    this._Router.events.subscribe((event: any) => {
      const currentUrl = event.url?.split("?");
      if (event instanceof NavigationStart) {
        this.hideCommonView = !!this.deprecatedPagesForUI.find((item: string) => item === currentUrl[0]);
        if (this.hideCommonView) {
          this.drawer.close();
        } else {
          // Open the drawer when user is not on the login page and logged in
          const currentUser = sessionStorage.getItem("UID");
          if (!currentUser) {
            this.drawer.close(); // Close drawer if no user is logged in
          } else {
            this.drawer.open(); // Open drawer when user is logged in
          }
        }
      }
      this.getMenuItemBasedOnPath(event.url);
      this.userInfo.name = sessionStorage.getItem("FirstName") || "";
      this.userInfo.username = sessionStorage.getItem("UserID") || "";
      this.userInfo.uid = sessionStorage.getItem("UID") || "";
      this.userInfo.usertype = sessionStorage.getItem("isAdmin") ? "Admin" : "";

      const currentUser = sessionStorage.getItem("UserID");
      if (!currentUser) {
        sessionStorage.clear();
        this.drawer?.close();
        this.ReFormatedMenus = [];
        this.masterMenuList = [];
      }
    });
  }

  onClickMenuItem(item: any) {
    // Handle menu expansion for parent items
    if (item.ChildList && item.ChildList.length > 0) {
      this.masterMenuList.forEach(items => {
        if (items.MenuID === item.MenuID) {
          items.IsExpanded = !items.IsExpanded;
        }
      });
    }
    // Handle navigation for leaf items
    else {
      this.setMenuSession(item);
      this.router.navigate([item.RouterPath]);
      // Close drawer in mobile view
      if (this.breakpointObserver.isMatched("(max-width: 749px)")) {
        this.drawer.close();
      }
    }
  }

  onDrawerChange() {
    this._GlobalService.IsSidebarOpen.next(this.isExpandedMenu);
  }

  setMenuSession(item: any) {
    sessionStorage.setItem("MenuID", item.MenuID?.toString());
    sessionStorage.setItem("MenuName", item.MenuName?.toString());
    sessionStorage.setItem("canAdd", item.canAdd?.toString());
    sessionStorage.setItem("canEdit", item.canEdit?.toString());
    sessionStorage.setItem("canDelete", item.canDelete?.toString());
    sessionStorage.setItem("canView", item.canVIEW?.toString());
  }

  getMenuItemBasedOnPath(url?: string) {
    const currentPath = url ? url : window.location.href;
    if (!this.masterMenuList.length) {
      this.masterMenuList = JSON.parse(sessionStorage.getItem("MenuList") || "[]");
    }
    if (!this.ReFormatedMenus.length) {
      this.ReFormatedMenus = this._GlobalService.reformatMenu(this.masterMenuList);
    }
    for (let i = 0; i < this.ReFormatedMenus.length; i++) {
      const element = this.ReFormatedMenus[i];
      if (currentPath == element.RouterPath) {
        this.setMenuSession(element);
        break;
      }
    }
  }

  OnLogOut() {
    this._Router.navigate(["login"]);
    sessionStorage.clear();
    location.reload();
  }
  toggleExpand(item: any): void {
    item.IsExpanded = !item.IsExpanded;
  }
  GetWhetherData() {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=20.610163&lon=72.9343&appid=3d6fb206398e0036ee2ae85337940672")
      .then(response => response.json())
      .then(data => {
        this.setWeatherData(data);
      });

    // fetch("https://api.openweathermap.org/data/2.5/weather?lat=21.700739&lon=72.991613&appid=3d6fb206398e0036ee2ae85337940672")
  }
  setWeatherData(data: any) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = currentDate.getTime() < sunsetTime.getTime();
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }

  // Check if the current route matches the menu item's route
  isActiveRoute(route: string): boolean {
    if (!route) return false;
    return this.router.url.includes(route);
  }

  // Handle mouse enter event for menu items
  onMouseEnter(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target.classList.contains("active")) {
      target.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
    }
  }

  // Handle mouse leave event for menu items
  onMouseLeave(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!this.isActiveRoute(target.getAttribute("routerLink") || "")) {
      target.style.backgroundColor = "";
    }
  }

  toggleSidebar(): void {
    this.isExpandedMenu = !this.isExpandedMenu;
    localStorage.setItem("sidebarExpanded", this.isExpandedMenu.toString());
    this._GlobalService.notifySidebarToggle();
  }

  handleDrawerToggle(isOpen: boolean) {
    this.isExpandedMenu = isOpen;
  }

  onDrawerToggle(event: boolean): void {
    this.isExpandedMenu = event;
    this._GlobalService.IsSidebarOpen.next(true);
  }

  // Remove leading forward slash from the URL
  getCurrentRoute(): string {
    return this.router.url.replace(/^\//, "");
  }
}

interface Int_UserInfo {
  name: string;
  username: string;
  uid: string;
  usertype: string;
}
