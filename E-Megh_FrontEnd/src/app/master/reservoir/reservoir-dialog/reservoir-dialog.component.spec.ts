import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservoirDialogComponent } from './reservoir-dialog.component';

describe('ReservoirDialogComponent', () => {
  let component: ReservoirDialogComponent;
  let fixture: ComponentFixture<ReservoirDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservoirDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservoirDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
