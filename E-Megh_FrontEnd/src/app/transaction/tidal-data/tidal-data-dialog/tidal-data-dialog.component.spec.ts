import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TidalDataDialogComponent } from './tidal-data-dialog.component';

describe('TidalDataDialogComponent', () => {
  let component: TidalDataDialogComponent;
  let fixture: ComponentFixture<TidalDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TidalDataDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TidalDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
