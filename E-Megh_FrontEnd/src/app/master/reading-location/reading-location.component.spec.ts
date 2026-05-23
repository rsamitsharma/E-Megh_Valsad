import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingLocationComponent } from './reading-location.component';

describe('ReadingLocationComponent', () => {
  let component: ReadingLocationComponent;
  let fixture: ComponentFixture<ReadingLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
