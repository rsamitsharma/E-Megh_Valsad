import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMasterDialogComponent } from './device-master-dialog.component';

describe('DeviceMasterDialogComponent', () => {
  let component: DeviceMasterDialogComponent;
  let fixture: ComponentFixture<DeviceMasterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceMasterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceMasterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
