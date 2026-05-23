import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: "[ReadOnly]",
  standalone: true,
})
export class ReadOnlyDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @Input() set ReadOnly(isReadOnly: boolean) {
    if (isReadOnly) {
      this.renderer.addClass(this.element.nativeElement, "disabled");
    } else {
      this.renderer.removeClass(this.element.nativeElement, "disabled");
    }
  }
}
