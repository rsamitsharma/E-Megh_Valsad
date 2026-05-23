import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalukaDialogComponent } from './taluka-dialog.component';

describe('TalukaDialogComponent', () => {
  let component: TalukaDialogComponent;
  let fixture: ComponentFixture<TalukaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalukaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalukaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
