import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaySironDataComponent } from './gateway-siron-data.component';

describe('GatewaySironDataComponent', () => {
  let component: GatewaySironDataComponent;
  let fixture: ComponentFixture<GatewaySironDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewaySironDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewaySironDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
