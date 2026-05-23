import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReadingComponent } from './daily-reading.component';

describe('DailyReadingComponent', () => {
  let component: DailyReadingComponent;
  let fixture: ComponentFixture<DailyReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyReadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
