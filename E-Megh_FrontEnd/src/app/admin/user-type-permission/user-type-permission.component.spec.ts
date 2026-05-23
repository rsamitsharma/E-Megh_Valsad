import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypePermissionComponent } from './user-type-permission.component';

describe('UserTypePermissionComponent', () => {
  let component: UserTypePermissionComponent;
  let fixture: ComponentFixture<UserTypePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTypePermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTypePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
