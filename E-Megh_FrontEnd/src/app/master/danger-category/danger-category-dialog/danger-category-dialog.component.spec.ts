import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerCategoryDialogComponent } from './danger-category-dialog.component';

describe('DangerCategoryDialogComponent', () => {
  let component: DangerCategoryDialogComponent;
  let fixture: ComponentFixture<DangerCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangerCategoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangerCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
