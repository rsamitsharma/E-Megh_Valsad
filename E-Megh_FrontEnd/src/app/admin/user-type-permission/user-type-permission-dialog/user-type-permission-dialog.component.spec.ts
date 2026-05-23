import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypePermissionDialogComponent } from './user-type-permission-dialog.component';

describe('UserTypePermissionDialogComponent', () => {
  let component: UserTypePermissionDialogComponent;
  let fixture: ComponentFixture<UserTypePermissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTypePermissionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTypePermissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
