import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphdashboardComponent } from './graphdashboard.component';

describe('GraphdashboardComponent', () => {
  let component: GraphdashboardComponent;
  let fixture: ComponentFixture<GraphdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphdashboardComponent]
    });
    fixture = TestBed.createComponent(GraphdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
