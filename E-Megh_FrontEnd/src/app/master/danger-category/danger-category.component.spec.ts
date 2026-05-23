import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerCategoryComponent } from './danger-category.component';

describe('DangerCategoryComponent', () => {
  let component: DangerCategoryComponent;
  let fixture: ComponentFixture<DangerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangerCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
