import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReadingReportDailogComponent } from './daily-reading-report-dailog.component';

describe('DailyReadingReportDailogComponent', () => {
  let component: DailyReadingReportDailogComponent;
  let fixture: ComponentFixture<DailyReadingReportDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyReadingReportDailogComponent]
    });
    fixture = TestBed.createComponent(DailyReadingReportDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
