import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { UsersService } from 'src/app/Services/users.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { Doctor } from 'src/app/Interfaces/doctor';
@Component({
  selector: 'hos-user-appointment-create',
  templateUrl: './user-appointment-create.component.html',
  styleUrls: ['./user-appointment-create.component.scss']
})
export class UserAppointmentCreateComponent implements OnInit {

  constructor(private location: Location, private authService: AuthService, private appointmentService: AppointmentService, private router:Router, private doctorService: DoctorService) { }
  user = this.authService.getUser();
  doctors:Doctor[] = []
  ngOnInit(): void {
    console.log( this.authService.getUser())
    this.getAllDoctors()
  }

  appointmentForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl(''),
    specialty: new FormControl('', Validators.required),
    doctor: new FormControl('', Validators.required),
    visitStart: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
  })

  goBack(){
    this.location.back();
  }

  submitForm(){
    let data = this.appointmentForm.value;
    data.userId = this.user._id;
    console.log(data);
    this.appointmentService.createAppointment(data).subscribe(()=>{
      this.router.navigate(["/user/appointments"])
    })
  }

  getAllDoctors(){
    this.doctorService.getAllDoctors().subscribe((response)=>{
      this.doctors = response.data;
      console.log(this.doctors);

    })
  }
}
