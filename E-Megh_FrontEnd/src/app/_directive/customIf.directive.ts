import { Directive, Input, Renderer2, ElementRef, RendererStyleFlags2 } from "@angular/core";

@Directive({
  selector: "[customIf]",
  standalone: true,
})
export class CustomIfDirective {
  @Input()
  set customIf(show: any) {
    this._Renderer.setStyle(this.element.nativeElement, "display", show ? "block" : "none", this.flag);
  }

  constructor(private element: ElementRef, private _Renderer: Renderer2) {}
  flag = RendererStyleFlags2.Important;
}
