import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ReservoirDischargeEntryComponent } from "./reservoir-discharge-entry.component";

describe("ReservoirDischargeEntryComponent", () => {
  let component: ReservoirDischargeEntryComponent;
  let fixture: ComponentFixture<ReservoirDischargeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservoirDischargeEntryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservoirDischargeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
