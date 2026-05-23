import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulldashboardComponent } from './fulldashboard.component';

describe('FulldashboardComponent', () => {
  let component: FulldashboardComponent;
  let fixture: ComponentFixture<FulldashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FulldashboardComponent]
    });
    fixture = TestBed.createComponent(FulldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
