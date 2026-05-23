import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningRuleDialogComponent } from './warning-rule-dialog.component';

describe('WarningRuleDialogComponent', () => {
  let component: WarningRuleDialogComponent;
  let fixture: ComponentFixture<WarningRuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningRuleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningRuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
