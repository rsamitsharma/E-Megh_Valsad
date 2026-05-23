import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaySensorDataComponent } from './gateway-sensor-data.component';

describe('GatewaySensorDataComponent', () => {
  let component: GatewaySensorDataComponent;
  let fixture: ComponentFixture<GatewaySensorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewaySensorDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewaySensorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
