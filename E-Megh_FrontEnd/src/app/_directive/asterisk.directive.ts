import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[Asterisk]",
  standalone: true,
})
export class AsteriskDirective implements OnInit {
  constructor(private renderer: Renderer2, private element: ElementRef) {}

  ngOnInit() {
    const span = this.renderer.createElement("span");
    const text = this.renderer.createText("*");
    span.style.color = "red";
    span.style.fontSize = "14px";
    span.style.marginLeft = "5px";
    span.appendChild(text);
    this.element.nativeElement.appendChild(span);
  }
}
