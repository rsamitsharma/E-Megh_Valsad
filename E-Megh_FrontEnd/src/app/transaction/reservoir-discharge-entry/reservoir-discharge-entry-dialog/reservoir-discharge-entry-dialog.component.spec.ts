import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ReservoirDischargeEntryDialogComponent } from "./reservoir-discharge-entry-dialog.component";

describe("ReservoirDischargeEntryDialogComponent", () => {
  let component: ReservoirDischargeEntryDialogComponent;
  let fixture: ComponentFixture<ReservoirDischargeEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservoirDischargeEntryDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservoirDischargeEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
