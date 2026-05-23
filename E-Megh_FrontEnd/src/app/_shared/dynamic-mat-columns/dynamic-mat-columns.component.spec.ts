import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMatColumnsComponent } from './dynamic-mat-columns.component';

describe('DynamicMatColumnsComponent', () => {
  let component: DynamicMatColumnsComponent;
  let fixture: ComponentFixture<DynamicMatColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicMatColumnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicMatColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
