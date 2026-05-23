import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVillagePolygonComponent } from './all-village-polygon.component';

describe('AllVillagePolygonComponent', () => {
  let component: AllVillagePolygonComponent;
  let fixture: ComponentFixture<AllVillagePolygonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllVillagePolygonComponent]
    });
    fixture = TestBed.createComponent(AllVillagePolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
