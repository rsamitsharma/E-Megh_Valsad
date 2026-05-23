import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayRaingaugeDataDialogComponent } from './gateway-raingauge-data-dialog.component';

describe('GatewayRaingaugeDataDialogComponent', () => {
  let component: GatewayRaingaugeDataDialogComponent;
  let fixture: ComponentFixture<GatewayRaingaugeDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayRaingaugeDataDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewayRaingaugeDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
