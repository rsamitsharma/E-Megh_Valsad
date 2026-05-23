import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaySensorDataDialogComponent } from './gateway-sensor-data-dialog.component';

describe('GatewaySensorDataDialogComponent', () => {
  let component: GatewaySensorDataDialogComponent;
  let fixture: ComponentFixture<GatewaySensorDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewaySensorDataDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewaySensorDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
