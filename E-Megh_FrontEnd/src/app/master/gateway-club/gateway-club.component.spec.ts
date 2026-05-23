import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayClubComponent } from './gateway-club.component';

describe('GatewayClubComponent', () => {
  let component: GatewayClubComponent;
  let fixture: ComponentFixture<GatewayClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewayClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
