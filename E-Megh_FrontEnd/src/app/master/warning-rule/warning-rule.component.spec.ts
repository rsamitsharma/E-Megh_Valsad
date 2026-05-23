import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningRuleComponent } from './warning-rule.component';

describe('WarningRuleComponent', () => {
  let component: WarningRuleComponent;
  let fixture: ComponentFixture<WarningRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
