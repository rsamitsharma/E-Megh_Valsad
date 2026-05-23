import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[OnlyNumber]",
  standalone: true,
})
export class OnlyNumberDirective {
  private specialKeys: Array<string> = ["Tab", "End", "Home", "ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"];
  // private allowedKeys: Array<number> = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110];
  private allowedKeys: Array<number> = [49, 50, 51, 52, 53, 54, 55, 56, 57, 46, 45, 48];
  @Input() IsDot: boolean = false;
  @Input() IsNegative: boolean = false;
  @Input() MaxDecimalPoints: number = 3;

  constructor(private el: ElementRef) {}

  @HostListener("keypress", ["$event"])
  keypress(event: KeyboardEvent) {
    var iKeyCode = event.which ? event.which : event.keyCode;
    if (this.specialKeys.indexOf(event.key) !== -1) return false;
    if (iKeyCode == 46 && !this.IsDot) return false;
    if (iKeyCode == 45 && !this.IsNegative) return false;
    if (event.key != "Backspace") {
      if (this.allowedKeys.indexOf(iKeyCode) < 0) {
        return false;
      }
    }
    return true;
  }

  @HostListener("mousewheel", ["$event"])
  onMouseWheel(event: KeyboardEvent) {
    event.preventDefault();
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: any) {
    const arrowList = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (arrowList.find(item => item === event.code)) event.preventDefault();
    if (this.IsDot) {
      const currentValue = event.target?.value as string;
      const checkDot = currentValue?.split(".");
      if (checkDot?.length === 2) {
        const decimalPoints = checkDot[1].length;
        if (decimalPoints > this.MaxDecimalPoints - 1 && event.key != "Backspace" && event.key != "Tab") {
          event.preventDefault();
        }
      }
    }
  }
}
