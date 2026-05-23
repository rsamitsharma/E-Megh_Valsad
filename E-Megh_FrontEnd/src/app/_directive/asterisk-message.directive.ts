import { Directive, ElementRef, Input, OnChanges, Renderer2 } from "@angular/core";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[AsteriskMessage]",
  standalone: true,
})
export class AsteriskMessageDirective implements OnChanges {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(change: any) {
    const asterisk = this.el.nativeElement;
    asterisk.innerHTML = "";
    if (this.messageList.length > 0) {
      const outerDiv = this.createElement("div", "asterisk-message-outer", "");
      this.renderer.appendChild(outerDiv, this.createElement("span", "asterisk-alert --text-red fw-bold", "*Error Messages"));
      this.renderer.appendChild(asterisk, outerDiv);
      this.renderer.appendChild(asterisk, this.createElement("div", "row m-0 px-3 pb-3 --border-red asterisk-container", ""));
      const row = asterisk.lastElementChild as HTMLElement;
      this.messageList.forEach(element => {
        const div = this.createElement("div", "col-xxl-4 col-lg-4 col-md-6 col-12 mt-3 --text-red", "* ");
        const span = this.createElement("span", "asterisk-message --text-red", element);
        this.renderer.appendChild(div, span);
        this.renderer.appendChild(row, div);
      });
    }
  }

  @Input() messageList: string[] = [];

  createElement(tag: string, className: string, value: string) {
    const element = this.renderer.createElement(tag);
    const text = this.renderer.createText(value);
    const classList = className?.split(" ");
    classList.forEach(item => {
      this.renderer.addClass(element, item);
    });
    value && this.renderer.appendChild(element, text);
    return element;
  }
}
