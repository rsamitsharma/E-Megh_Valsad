import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelMasterDialogComponent } from './level-master-dialog.component';

describe('LevelMasterDialogComponent', () => {
  let component: LevelMasterDialogComponent;
  let fixture: ComponentFixture<LevelMasterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelMasterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelMasterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
