import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[SelectInputField]'
})
export class SelectFieldDirective {

  constructor(private element: ElementRef, private renderer: Renderer2, private toastr: ToastrService) { }

  ngOnInit(): void { }

  @HostListener('keyup') onkeyup() {
    this.defaultFunction();
  }

  currentMasterList: any[] = [];

  defaultFunction() {
    //debugger;
    const element = this.element.nativeElement;
    const nextElement = element.nextElementSibling?.nextElementSibling;
    const optionsElement = nextElement?.children;
    if (optionsElement?.length) {
      this.currentMasterList = [];
      for (let i = 0; i < optionsElement.length; i++) {
        const optionElement = optionsElement[i];
        const optionText = optionElement.innerText;
        this.currentMasterList.push(optionText);
      }
      const inputValue = element.value?.toString()?.trim()?.toLowerCase();
      const filteredList = this.currentMasterList.filter(x => x?.toString()?.trim()?.toLowerCase().includes(inputValue));
      if (!filteredList.length && inputValue) {
        this.toastr.info("Not Found", "info");
      }
      for (let i = 0; i < optionsElement.length; i++) {
        const optionElement = optionsElement[i];
        const optionText = optionElement.innerText;
        this.renderer.removeClass(optionElement, 'selected-option');
        if (!inputValue) {
          this.renderer.removeClass(optionElement, 'show-option');
          this.renderer.removeClass(optionElement, 'hide-option');
          this.renderer.addClass(optionElement, 'show-option');
          continue;
        }
        if (filteredList.includes(optionText)) {
          this.renderer.addClass(optionElement, 'show-option');
          this.renderer.removeClass(optionElement, 'hide-option');
        } else {
          this.renderer.removeClass(optionElement, 'show-option');
          this.renderer.addClass(optionElement, 'hide-option');
        }
      }
    }
  }

}
