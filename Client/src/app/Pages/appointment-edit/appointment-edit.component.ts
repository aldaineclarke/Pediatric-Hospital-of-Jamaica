import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/Interfaces/appointment';
import { Doctor } from 'src/app/Interfaces/doctor';
import { User } from 'src/app/Interfaces/user';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {

  doctors: Doctor[] = [];
  doctorsPool: Doctor[] = [];
  appointment!: Appointment;
  constructor(private doctorService: DoctorService, private appointmentService: AppointmentService, private route:ActivatedRoute, private router:Router) { }

  appointmentUpdateForm = new FormGroup({
    doctor: new FormControl("", Validators.required),
    fname: new FormControl("", Validators.required),
    lname: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    visitStart: new FormControl("", Validators.required),
    notes: new FormControl("", Validators.required),
    specialty: new FormControl("", Validators.required),
  })
  ngOnInit(): void {
    this.getAppointmentFromId();
    this.getDoctors();

    this.appointmentUpdateForm.get("specialty")?.valueChanges.subscribe((change)=>{
      this.doctorsPool = this.doctors.filter((doc)=>{
        return doc.department == change;
      })
    })
  }

  getAppointmentFromId(){
    this.route.paramMap.subscribe((params)=>{
      let id = params.get("id") as string;

      this.appointmentService.getAppointmentById(id).subscribe((response)=>{
        this.appointment = response.data;
        let data = {
          doctor: this.appointment.doctor,
          fname: this.appointment.fname,
          lname: this.appointment.lname,
          email: this.appointment.email,
          phone: this.appointment.phone,
          visitStart:this.appointment.visitStart,
          notes: this.appointment.notes,
          specialty: "Surgeon",
        }
        this.setFormData(data);
      })
    })
    
  }

  submitForm(){
    this.appointmentService.updateAppointment(this.appointment._id, this.appointmentUpdateForm.value).subscribe(()=>{
      this.router.navigate(['admin/appointments'])
    })
  }

  setFormData(data:Partial<Appointment>){
    this.appointmentUpdateForm.setValue(data);
    this.appointmentUpdateForm.get("visitStart")?.setValue(((data.visitStart as unknown) as string).slice(0,16));
  }

  getDoctors(){
    this.doctorService.getAllDoctors().subscribe((response)=>{
      this.doctors = response.data;
      this.doctorsPool = this.doctors;
    })
  }
}
