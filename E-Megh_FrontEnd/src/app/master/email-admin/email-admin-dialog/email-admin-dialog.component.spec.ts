import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAdminDialogComponent } from './email-admin-dialog.component';

describe('EmailAdminDialogComponent', () => {
  let component: EmailAdminDialogComponent;
  let fixture: ComponentFixture<EmailAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailAdminDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
