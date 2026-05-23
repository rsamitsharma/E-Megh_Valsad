import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SirenSensorComponent } from "./siren-sensor.component";

describe("SirenSensorComponent", () => {
  let component: SirenSensorComponent;
  let fixture: ComponentFixture<SirenSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SirenSensorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SirenSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
