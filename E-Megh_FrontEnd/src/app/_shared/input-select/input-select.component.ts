import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from "@angular/core";
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatIcon } from "@angular/material/icon";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "input-select",
  templateUrl: "./input-select.component.html",
  styleUrls: ["./input-select.component.scss"],
})
export class InputSelectComponent {
  @ViewChild("Input") Input!: ElementRef;
  @ViewChild("NonChipInput") NonChipInput!: ElementRef;

  //Inputs
  @Input() placeholder: string = " ";
  @Input() inputLabel: string = "";
  @Input() readonly: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() isSearch: boolean = true;
  @Input() itemNotFoundMessage: string = "Item not found";
  @Input() defaultValue: any = null;
  @Input() defaultValueName: string = "";
  @Input() isDefaultDisabled: boolean = true;
  @Input() isChips: boolean = false;

  @Input() masterList: any[] = [];
  @Input() selectedValue: any;
  @Output() selectedValueChange = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelectionChange = new EventEmitter<any>();
  @ViewChildren(MatAutocompleteTrigger) autoTrigger!: QueryList<MatAutocompleteTrigger>;
  @ViewChild(MatAutocomplete) matAutocomplete!: MatAutocomplete;

  randomNumber = Math.floor(Math.random() * 90000) + 10000;
  isItemNotFound: boolean = false;
  currentMasterList: any[] = [];

  //#region checkbox

  onOptionSelected(value: number, event: MatAutocompleteSelectedEvent) {
    const self = this;
    setTimeout(function () {
      self.autoTrigger["_results"][value].openPanel();
    }, 0);
    setTimeout(() => {
      const selectedOption = this.masterList.find(el => el.id === event.option.value);
      if (selectedOption) selectedOption.IsChipSelected = !selectedOption.IsChipSelected;
      this.onSelectionChange.emit(selectedOption);
    }, 0);
  }

  onRemoveChip(item: any) {
    item.IsChipSelected = false;
    this.onSelectionChange.emit(item);
  }

  //#endregion

  getTitle(id: number) {
    if (!this.masterList?.length) return "";
    return this.masterList.find(el => el.id === id)?.name || "";
  }

  get isPanelOpen() {
    let isOpen = false;
    isOpen = this.matAutocomplete?.isOpen;
    return isOpen;
  }

  onArrowClick(arrow: MatIcon, event: any) {
    const currentIcon = arrow._elementRef.nativeElement?.innerText;
    if (currentIcon === "keyboard_arrow_down") {
      this.onClickLabel();
    } else {
      this.autoTrigger["_results"][0]?.closePanel();
    }
    event?.stopPropagation();
    event?.preventDefault();
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.selectedValue = event.option.value;
    this.selectedValueChange.emit(this.selectedValue);
    const option = this.masterList.find((el: any) => el.id == this.selectedValue);
    this.onSelectionChange.emit(option);
  }

  onFocus() {
    this.masterList.forEach((el: any) => {
      el.IsFound = true;
    });
  }

  onBlur() {
    if (!this.NonChipInput?.nativeElement?.value?.trim()) this.selectedValueChange.emit(0);
  }

  onClickLabel() {
    if (this.isChips) {
      this.masterList.forEach((el: any) => (el.IsFound = true));
      this.Input.nativeElement?.focus();
    } else {
      this.NonChipInput.nativeElement?.focus();
    }
  }

  _filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value?.trim();
    this.masterList.forEach((item: any) => (item.IsFound = !!!filterValue));
    this.masterList.filter(option => option.name.trim().toLowerCase().includes(filterValue.toLowerCase())).forEach((item: any) => (item.IsFound = true));
    this.isItemNotFound = this.masterList.filter(el => !el.IsFound)?.length === this.masterList.length;
  }
}
