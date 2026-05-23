import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionTidalchartComponent } from './prediction-tidalchart.component';

describe('PredictionTidalchartComponent', () => {
  let component: PredictionTidalchartComponent;
  let fixture: ComponentFixture<PredictionTidalchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredictionTidalchartComponent]
    });
    fixture = TestBed.createComponent(PredictionTidalchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
