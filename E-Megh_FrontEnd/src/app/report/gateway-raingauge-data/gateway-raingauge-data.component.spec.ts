import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayRaingaugeDataComponent } from './gateway-raingauge-data.component';

describe('GatewayRaingaugeDataComponent', () => {
  let component: GatewayRaingaugeDataComponent;
  let fixture: ComponentFixture<GatewayRaingaugeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayRaingaugeDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewayRaingaugeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
