import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaingaugeStationDialogComponent } from './raingauge-station-dialog.component';

describe('RaingaugeStationDialogComponent', () => {
  let component: RaingaugeStationDialogComponent;
  let fixture: ComponentFixture<RaingaugeStationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaingaugeStationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaingaugeStationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
