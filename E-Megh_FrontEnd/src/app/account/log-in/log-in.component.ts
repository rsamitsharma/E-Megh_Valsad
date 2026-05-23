import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from "@source/app/_services";
import { AuthenticationService } from "@source/app/_services/authentication.service";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";
import { interval, Subscription } from "rxjs";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"],
})
export class LogInComponent extends UnSubscriber implements OnDestroy {
  constructor(
    private _AuthenticationService: AuthenticationService, 
    private toastr: ToastrService, 
    private _ActiveRoute: ActivatedRoute, 
    private _Router: Router, 
    private _GlobalService: GlobalService,
    private cdr: ChangeDetectorRef
  ) {
    setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    super();
  }

  Username: string = "";
  Password: string = "";

  // Mobile OTP properties
  useMobileLogin: boolean = false;
  showMobileLoginOption: boolean = true; // Controls whether to show the mobile login checkbox
  mobileNumber: string = "";
  otp: string = "";
  showOtpField: boolean = false;
  otpTimer: number = 0;
  private otpSubscription: Subscription | null = null;

  validateForm(): boolean {
    var isValid: boolean = true;
    var msg: string = "";

    if (!this.Username?.trim()) {
      msg += "Username / Email is required.\n";
    }

    if (!this.Password?.trim()) {
      msg += "Password is required.\n";
    }

    if (msg) {
      this.toastr.error(msg, "Error");
      isValid = false;
    }

    return isValid;
  }

  onLogin() {
    if (!this.validateForm()) return;
    this.anotherSubscription = this._AuthenticationService.UserLogin(this.Username, this.Password).subscribe((res: any) => {
      const { Table } = res;

      let userMenu = Table[2];
      const userInfo = Table[0][0];

      this._GlobalService.IsAdminLoggedIn.next(userInfo.IsAdmin);
      userMenu = this._GlobalService.menuSetter(userMenu);
      sessionStorage.setItem("UID", userInfo.UID);
      sessionStorage.setItem("UserType", userInfo.UserType);
      sessionStorage.setItem("UserTypeId", userInfo.UserType);
      sessionStorage.setItem("Name", userInfo.Name);
      sessionStorage.setItem("EMail", userInfo.EMail);
      sessionStorage.setItem("MobileNo", userInfo.MobileNo);
      sessionStorage.setItem("IsAccept", userInfo.IsAccept);
      sessionStorage.setItem("UserCode", userInfo.UserCode);
      sessionStorage.setItem("UserID", userInfo.UserID);
      sessionStorage.setItem("isAdmin", userInfo.IsAdmin);
      sessionStorage.setItem("ReadingLocationList", JSON.stringify(Table[1]));
      sessionStorage.setItem("MenuList", JSON.stringify(userMenu));
      sessionStorage.setItem("Token", res.Token);
      this.toastr.success("Logged in Successfully");
      this._Router.navigate(["/unified-dashboard"]);
    });
  }

  onGuestClick() {
    this._Router.navigate(["/guest-user"]);
  }

  // Mobile OTP methods
  onMobileInput(event: any) {
    // Allow only numbers
    this.mobileNumber = event.target.value.replace(/[^0-9]/g, "");
  }

  toggleLoginMethod() {
    // Toggle the mobile login state
    this.useMobileLogin = !this.useMobileLogin;
    
    // Reset form when toggling
    this.Username = '';
    this.Password = '';
    this.mobileNumber = '';
    this.otp = '';
    this.showOtpField = false;
    
    // Clear any existing timer
    if (this.otpSubscription) {
      this.otpSubscription.unsubscribe();
      this.otpTimer = 0;
    }
    
    // Manually trigger change detection
    this.cdr.detectChanges();
  }

  sendOtp() {
    if (!this.mobileNumber || this.mobileNumber.length !== 10) {
      this.toastr.error("Please enter a valid 10-digit mobile number");
      return;
    }

    // Call the GetUserByMobileNo API to check if the mobile number is registered
    this._AuthenticationService.GetUserByMobileNo(this.mobileNumber).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res && res.Table && res.Table[0] && res.Table[0][0] && res.OTP) {
          // Store OTP in session storage for verification
          sessionStorage.setItem('otp', res.OTP);

          
          // Store user data in session storage for login after OTP verification
          const userData = res.Table[0][0];
          this.Username = userData.UserID;
          this.Password = userData.Pwd;
          console.log(this.Username, this.Password);
        
          
          // Proceed with OTP outflow
          
          this.showOtpField = true;
          this.startOtpTimer();
          this.toastr.success(res.message || "OTP sent to your mobile number");
        } else {
          this.toastr.error(res?.message || "This mobile number is not registered");
        }
      },
      error: (err) => {
        console.error("Error checking mobile number:", err);
        this.toastr.error(err.error?.message || "Error verifying mobile number. Please try again.");
      }
    });
  }

  verifyOtp() {
    if (!this.otp || this.otp.length !== 5) {
      this.toastr.error("Please enter a valid 5-digit OTP");
      return;
    }
    // i want to 

    const storedOtp = sessionStorage.getItem('otp');

    if (!storedOtp) {
      this.toastr.error("OTP expired. Please request a new OTP.");
      this.showOtpField = false;
      return;
    }

    if (this.otp == storedOtp) {
      if (!this.validateForm()) return;
      this.anotherSubscription = this._AuthenticationService.UserLogin(this.Username, this.Password).subscribe((res: any) => {
        const { Table } = res;
  
        let userMenu = Table[2];
        const userInfo = Table[0][0];
  
        this._GlobalService.IsAdminLoggedIn.next(userInfo.IsAdmin);
        userMenu = this._GlobalService.menuSetter(userMenu);
        sessionStorage.setItem("UID", userInfo.UID);
        sessionStorage.setItem("UserType", userInfo.UserType);
        sessionStorage.setItem("UserTypeId", userInfo.UserType);
        sessionStorage.setItem("Name", userInfo.Name);
        sessionStorage.setItem("EMail", userInfo.EMail);
        sessionStorage.setItem("MobileNo", userInfo.MobileNo);
        sessionStorage.setItem("IsAccept", userInfo.IsAccept);
        sessionStorage.setItem("UserCode", userInfo.UserCode);
        sessionStorage.setItem("UserID", userInfo.UserID);
        sessionStorage.setItem("isAdmin", userInfo.IsAdmin);
        sessionStorage.setItem("ReadingLocationList", JSON.stringify(Table[1]));
        sessionStorage.setItem("MenuList", JSON.stringify(userMenu));
        sessionStorage.setItem("Token", res.Token);
        sessionStorage.removeItem('otp');
        this.toastr.success("Logged in Successfully");
        this._Router.navigate(["/unified-dashboard"]);
      });
    } else {
      this.toastr.error("Invalid OTP. Please try again.");
      return;
    }

    // OTP verification successful, proceed with login
  
  }

  private startOtpTimer() {
    this.otpTimer = 30; // 30 seconds timer
    this.otpSubscription = interval(1000)
      .pipe(takeWhile(() => this.otpTimer > 0))
      .subscribe(() => {
        this.otpTimer--;
        if (this.otpTimer === 0 && this.otpSubscription) {
          this.otpSubscription.unsubscribe();
        }
      });
  }

  private handleLoginSuccess(res: any) {
    const { Table } = res;
    const userInfo = Table[0][0];

    this._GlobalService.IsAdminLoggedIn.next(userInfo.IsAdmin);
    const userMenu = this._GlobalService.menuSetter(Table[2]);

    sessionStorage.setItem("UID", userInfo.UID);
    sessionStorage.setItem("UserType", userInfo.UserType);
    sessionStorage.setItem("UserTypeId", userInfo.UserType);
    sessionStorage.setItem("Name", userInfo.Name);
    sessionStorage.setItem("EMail", userInfo.EMail);
    sessionStorage.setItem("MobileNo", userInfo.MobileNo || this.mobileNumber);
    sessionStorage.setItem("IsAccept", userInfo.IsAccept);
    sessionStorage.setItem("UserCode", userInfo.UserCode);
    sessionStorage.setItem("UserID", userInfo.UserID);
    sessionStorage.setItem("isAdmin", userInfo.IsAdmin);
    sessionStorage.setItem("ReadingLocationList", JSON.stringify(Table[1]));
    sessionStorage.setItem("MenuList", JSON.stringify(userMenu));
    sessionStorage.setItem("Token", res.Token);

    this.toastr.success("Logged in successfully");
    this._Router.navigate(["/unified-dashboard"]);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.otpSubscription) {
      this.otpSubscription.unsubscribe();
    }
  }
}
