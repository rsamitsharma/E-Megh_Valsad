import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayClubDialogComponent } from './gateway-club-dialog.component';

describe('GatewayClubDialogComponent', () => {
  let component: GatewayClubDialogComponent;
  let fixture: ComponentFixture<GatewayClubDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayClubDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewayClubDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
