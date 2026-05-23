import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimDialogComponent } from './sim-dialog.component';

describe('SimDialogComponent', () => {
  let component: SimDialogComponent;
  let fixture: ComponentFixture<SimDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
