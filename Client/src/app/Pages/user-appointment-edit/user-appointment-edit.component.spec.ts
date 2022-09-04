import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppointmentEditComponent } from './user-appointment-edit.component';

describe('UserAppointmentEditComponent', () => {
  let component: UserAppointmentEditComponent;
  let fixture: ComponentFixture<UserAppointmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAppointmentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppointmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
