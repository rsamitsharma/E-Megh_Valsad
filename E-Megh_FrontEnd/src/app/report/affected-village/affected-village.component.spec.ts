import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectedVillageComponent } from './affected-village.component';

describe('AffectedVillageComponent', () => {
  let component: AffectedVillageComponent;
  let fixture: ComponentFixture<AffectedVillageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectedVillageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectedVillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
