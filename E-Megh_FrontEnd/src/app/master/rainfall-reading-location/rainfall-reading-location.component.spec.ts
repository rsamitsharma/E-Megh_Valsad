import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainfallReadingLocationComponent } from './rainfall-reading-location.component';

describe('RainfallReadingLocationComponent', () => {
  let component: RainfallReadingLocationComponent;
  let fixture: ComponentFixture<RainfallReadingLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RainfallReadingLocationComponent]
    });
    fixture = TestBed.createComponent(RainfallReadingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
