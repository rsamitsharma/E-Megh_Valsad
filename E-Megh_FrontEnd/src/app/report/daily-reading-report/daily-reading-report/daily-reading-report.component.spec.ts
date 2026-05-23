import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReadingReportComponent } from './daily-reading-report.component';

describe('DailyReadingReportComponent', () => {
  let component: DailyReadingReportComponent;
  let fixture: ComponentFixture<DailyReadingReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyReadingReportComponent]
    });
    fixture = TestBed.createComponent(DailyReadingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
