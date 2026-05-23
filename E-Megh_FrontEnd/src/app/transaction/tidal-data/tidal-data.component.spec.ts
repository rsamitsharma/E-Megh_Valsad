import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TidalDataComponent } from './tidal-data.component';

describe('TidalDataComponent', () => {
  let component: TidalDataComponent;
  let fixture: ComponentFixture<TidalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TidalDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TidalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
