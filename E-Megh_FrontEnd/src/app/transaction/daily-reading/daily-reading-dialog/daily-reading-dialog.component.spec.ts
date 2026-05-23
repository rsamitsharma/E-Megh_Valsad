import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReadingDialogComponent } from './daily-reading-dialog.component';

describe('DailyReadingDialogComponent', () => {
  let component: DailyReadingDialogComponent;
  let fixture: ComponentFixture<DailyReadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyReadingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyReadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
