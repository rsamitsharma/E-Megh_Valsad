import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SirenSensorDialogComponent } from './siren-sensor-dialog.component';

describe('SirenSensorDialogComponent', () => {
  let component: SirenSensorDialogComponent;
  let fixture: ComponentFixture<SirenSensorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SirenSensorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SirenSensorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
