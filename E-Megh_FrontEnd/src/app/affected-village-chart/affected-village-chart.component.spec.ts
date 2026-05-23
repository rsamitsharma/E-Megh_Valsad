import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectedVillageChartComponent } from './affected-village-chart.component';

describe('AffectedVillageChartComponent', () => {
  let component: AffectedVillageChartComponent;
  let fixture: ComponentFixture<AffectedVillageChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectedVillageChartComponent]
    });
    fixture = TestBed.createComponent(AffectedVillageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
