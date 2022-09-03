import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/Interfaces/appointment';
import { User } from 'src/app/Interfaces/user';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  constructor(private usersService: UsersService, private appointmentService: AppointmentService) { }
  appointments:Appointment[] = [];
  doctors: User[] = [];
  ngOnInit(): void {
    this.getAllAppointments();
    this.getAllDoctors();
  }

  deleteAppointment(id:string){
    if(confirm('Are you sure you want to delete')){
      this.appointmentService.deleteAppointment(id).subscribe(()=>{
        this.appointments = this.appointments.filter((appointment)=>{
          return appointment._id != id;
        })
      })
    }
    
  }
  findDoctorById(id:string){
    let doctor = this.doctors.filter((doctor)=>{
      return doctor._id == id;
    })[0];
    if(doctor){
      return (doctor.title+". "+doctor.fname+ " "+doctor.lname);
    }
    return 
  }
  getAllAppointments(){
    this.appointmentService.getAllAppointments().subscribe((response)=>{
      this.appointments = response.data;
    })
  }
  getAllDoctors(){
    this.usersService.getAllDoctors().subscribe((response)=>{
      this.doctors = response.data;
    })
  }
}
