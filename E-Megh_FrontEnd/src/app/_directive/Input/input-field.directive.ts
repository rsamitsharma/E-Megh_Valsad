import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[InputField]",
  standalone: true,
})
export class InputFieldDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const labelElement = this.element.nativeElement?.nextElementSibling;
    const randomNumber = Math.floor(Math.random() * 900000) + 1000000;
    this.renderer.setAttribute(labelElement, "for", `${randomNumber}`);
    this.renderer.setAttribute(this.element.nativeElement, "id", `${randomNumber}`);
    this.isDateField = this.element.nativeElement.type == "date" ? true : false;
    if (!this.placeholderActive(this.element.nativeElement)) this.renderer.setAttribute(this.element.nativeElement, "placeholder", " ");
  }

  @HostListener("blur") onBlur() {
    this.renderer.removeClass(this.element.nativeElement?.nextElementSibling, "--input--filled");
    if (this.isDateField) {
      this.renderer.addClass(this.element.nativeElement?.nextElementSibling, "--input--filled");
      return;
    }
    const { value } = this.element.nativeElement;
    console.log(value);
    const trimmedValue = value?.toString()?.trim();
    if (trimmedValue) {
      this.renderer.addClass(this.element.nativeElement?.nextElementSibling, "--input--filled");
    } else {
      this.renderer.removeClass(this.element.nativeElement?.nextElementSibling, "--input--filled");
    }
  }

  @HostListener("focus") onFocus() {
    this.renderer.removeClass(this.element.nativeElement?.nextElementSibling, "--input--filled");
  }

  @HostListener("keydown", ["$event"]) onkeydown(event: any) {
    const { keyCode } = event;
    const parentElement = this.element.nativeElement.parentElement as HTMLElement;
    if (parentElement.className.includes("disabled") && keyCode !== 9) {
      return false;
    }
    return true;
  }

  isDateField: boolean = false;

  placeholderActive(selector: HTMLInputElement) {
    if (selector.getAttribute("placeholder")) {
      return true;
    }
    return false;
  }

  defaultFunction() {}
}
