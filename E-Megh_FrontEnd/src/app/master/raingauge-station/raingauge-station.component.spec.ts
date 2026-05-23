import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaingaugeStationComponent } from './raingauge-station.component';

describe('RaingaugeStationComponent', () => {
  let component: RaingaugeStationComponent;
  let fixture: ComponentFixture<RaingaugeStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaingaugeStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaingaugeStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
