import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/Interfaces/doctor';
import { User } from 'src/app/Interfaces/user';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/auth.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UsersService } from 'src/app/Services/users.service';
import { Location } from '@angular/common';
import { Appointment } from 'src/app/Interfaces/appointment';

@Component({
  selector: 'hos-user-appointment-edit',
  templateUrl: './user-appointment-edit.component.html',
  styleUrls: ['./user-appointment-edit.component.scss']
})
export class UserAppointmentEditComponent implements OnInit {
  
  constructor(private location: Location, private authService: AuthService, private appointmentService: AppointmentService, private router:Router, private doctorService: DoctorService, private usersService: UsersService, private route: ActivatedRoute) { }
  user = this.authService.getUser();
  currentUser!: User;
  appointment!: Appointment;
  departments:string[] = this.doctorService.DEPARTMENTS;
  doctors:Doctor[] = []
  ngOnInit(): void {
    console.log( this.authService.getUser())
    this.getAllDoctors();
    this.getCurrentUser();
    this.fillFormWithData();
  }



  appointmentEditForm = new FormGroup({
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

  updateForm(){
    let data = this.appointmentEditForm.value;
    data.userId = this.user._id;
    console.log(data);
    this.appointmentService.updateAppointment(this.appointment._id,data).subscribe(()=>{
      this.router.navigate(["/user/appointments"])
    })
  }

  getAllDoctors(){
    this.doctorService.getAllDoctors().subscribe((response)=>{
      this.doctors = response.data;
      console.log(this.doctors);

    })
  }
  getCurrentUser(){
    this.usersService.getUserById(this.user._id).subscribe((response)=>{
      this.currentUser = response.data;
    })
  }
  fillFormWithData(){
    let id = ""
    this.route.paramMap.subscribe((params)=>{
      id = params.get("id") as string;
      this.appointmentService.getAppointmentById(id).subscribe((response)=>{
        this.appointment = response.data;

        this.appointmentEditForm.setValue({
          fname: this.appointment.fname,
          lname: this.appointment.lname,
          email: this.appointment.email,
          phone: this.appointment.phone,
          doctor: this.appointment.doctor,
          visitStart: new Date(this.appointment.visitStart).toJSON().slice(0,16),
          notes: this.appointment.notes,
          specialty: ""
        })
      })
  
    })
    
  }

}
