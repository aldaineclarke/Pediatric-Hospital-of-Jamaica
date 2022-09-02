import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { UsersService } from 'src/app/Services/users.service';
@Component({
  selector: 'hos-user-appointment-create',
  templateUrl: './user-appointment-create.component.html',
  styleUrls: ['./user-appointment-create.component.scss']
})
export class UserAppointmentCreateComponent implements OnInit {

  constructor(private location: Location, private authService: AuthService, private appointmentService: AppointmentService, private router:Router, private usersService: UsersService) { }
  user = this.authService.getUser();
  doctors:User[] = []
  ngOnInit(): void {
    console.log( this.authService.getUser())
    this.getAllDoctors()
  }

  appointmentForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    gender: new FormControl('Male', Validators.required),
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
    this.usersService.getAllUsers("Doctor").subscribe((response)=>{
      this.doctors = response.data;
      console.log(this.doctors);

    })
  }
}
