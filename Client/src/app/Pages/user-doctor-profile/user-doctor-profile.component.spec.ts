import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDoctorProfileComponent } from './user-doctor-profile.component';

describe('UserDoctorProfileComponent', () => {
  let component: UserDoctorProfileComponent;
  let fixture: ComponentFixture<UserDoctorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDoctorProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDoctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
