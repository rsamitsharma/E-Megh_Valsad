import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReadingLocationDialogComponent } from './user-reading-location-dialog.component';

describe('UserReadingLocationDialogComponent', () => {
  let component: UserReadingLocationDialogComponent;
  let fixture: ComponentFixture<UserReadingLocationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReadingLocationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReadingLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
