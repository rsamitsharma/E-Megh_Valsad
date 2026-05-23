import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillagePolygonAddComponent } from './village-polygon-add.component';

describe('VillagePolygonAddComponent', () => {
  let component: VillagePolygonAddComponent;
  let fixture: ComponentFixture<VillagePolygonAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VillagePolygonAddComponent]
    });
    fixture = TestBed.createComponent(VillagePolygonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
