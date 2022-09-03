import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/Interfaces/doctor';
import { User } from 'src/app/Interfaces/user';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss']
})
export class AppointmentCreateComponent implements OnInit {

  constructor(private doctorsService: DoctorService, private appointmentService: AppointmentService, private router: Router) { }
  doctors:Doctor[] = [];
  doctorsPool:Doctor[] = [];
  ngOnInit(): void {

    this.getAllDoctors();
    this.appointmentCreationForm.get("specialty")?.valueChanges.subscribe((change)=>{
      this.doctorsPool = this.doctors.filter((doc)=>{
        return doc.department == change;
      })
    })
  }
  appointmentCreationForm = new FormGroup({
    doctor: new FormControl("", Validators.required),
    fname: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    lname: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    visitStart: new FormControl("", Validators.required),
    notes: new FormControl("", Validators.required),
    specialty: new FormControl("", Validators.required),
  })

  


  getAllDoctors(){
    this.doctorsService.getAllDoctors().subscribe((response)=>{
      this.doctors = response.data;
      this.doctorsPool = this.doctors;
    })
  }
  submitForm(){
    const data = {
      doctor: this.appointmentCreationForm.get("doctor")?.value,
      fname: this.appointmentCreationForm.get("fname")?.value,
      lname: this.appointmentCreationForm.get("lname")?.value,
      email: this.appointmentCreationForm.get("email")?.value,
      phone: this.appointmentCreationForm.get("phone")?.value,
      visitStart: this.appointmentCreationForm.get("visitStart")?.value,
      notes: this.appointmentCreationForm.get("notes")?.value,
    }

    
    this.appointmentService.createAppointment(data).subscribe(()=>{
      this.router.navigate(["admin/appointments"])
    })
  }

}
