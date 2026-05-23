import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTimeComponent } from './refresh-time.component';

describe('RefreshTimeComponent', () => {
  let component: RefreshTimeComponent;
  let fixture: ComponentFixture<RefreshTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreshTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
