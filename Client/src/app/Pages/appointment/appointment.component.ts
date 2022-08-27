import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/Interfaces/appointment';
import { User } from 'src/app/Interfaces/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  constructor(private usersService: UsersService) { }
  appointments:Appointment[] = [];
  doctors: User[] = [];
  ngOnInit(): void {

  }

  deleteAppointment(id:string){

  }
  findDoctorById(id:string){
    return this.doctors.filter((doctor)=>{
      return doctor._id == id;
    })
  }
  getAllDoctors(){
    this.usersService.getAllUsers("Doctor").subscribe((response)=>{
      this.doctors = response.data;
    })
  }
}
