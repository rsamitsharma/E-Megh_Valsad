import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReadingLocationComponent } from './user-reading-location.component';

describe('UserReadingLocationComponent', () => {
  let component: UserReadingLocationComponent;
  let fixture: ComponentFixture<UserReadingLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReadingLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReadingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
