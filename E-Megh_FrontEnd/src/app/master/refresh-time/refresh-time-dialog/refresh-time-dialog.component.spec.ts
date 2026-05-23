import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTimeDialogComponent } from './refresh-time-dialog.component';

describe('RefreshTimeDialogComponent', () => {
  let component: RefreshTimeDialogComponent;
  let fixture: ComponentFixture<RefreshTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshTimeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreshTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
