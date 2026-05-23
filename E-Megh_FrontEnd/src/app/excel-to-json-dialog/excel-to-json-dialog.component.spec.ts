import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ExcelToJsonDialogComponent } from "./excel-to-json-dialog.component";

describe("ExcelToJsonDialogComponent", () => {
  let component: ExcelToJsonDialogComponent;
  let fixture: ComponentFixture<ExcelToJsonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExcelToJsonDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExcelToJsonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
