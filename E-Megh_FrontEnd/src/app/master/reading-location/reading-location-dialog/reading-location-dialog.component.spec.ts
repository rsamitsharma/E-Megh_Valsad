import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingLocationDialogComponent } from './reading-location-dialog.component';

describe('ReadingLocationDialogComponent', () => {
  let component: ReadingLocationDialogComponent;
  let fixture: ComponentFixture<ReadingLocationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingLocationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
