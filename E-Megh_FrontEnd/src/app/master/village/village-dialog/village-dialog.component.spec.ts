import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageDialogComponent } from './village-dialog.component';

describe('VillageDialogComponent', () => {
  let component: VillageDialogComponent;
  let fixture: ComponentFixture<VillageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
