import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaySironDataDialogComponent } from './gateway-siron-data-dialog.component';

describe('GatewaySironDataDialogComponent', () => {
  let component: GatewaySironDataDialogComponent;
  let fixture: ComponentFixture<GatewaySironDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewaySironDataDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewaySironDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
