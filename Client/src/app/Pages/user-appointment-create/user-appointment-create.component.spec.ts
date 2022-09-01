import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppointmentCreateComponent } from './user-appointment-create.component';

describe('UserAppointmentCreateComponent', () => {
  let component: UserAppointmentCreateComponent;
  let fixture: ComponentFixture<UserAppointmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAppointmentCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppointmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
