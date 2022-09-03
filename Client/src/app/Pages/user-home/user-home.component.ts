import { Component, OnInit } from '@angular/core';
import { AppointmentPop } from 'src/app/Interfaces/appointment';
import { User } from 'src/app/Interfaces/user';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'hos-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  constructor(private authService: AuthService, private appointmentService: AppointmentService) { }
  upAppointment!: AppointmentPop;

  ngOnInit(): void {
    this.getUserAppointment();
  }

  getUserAppointment(){
    let id = this.authService.getUser()._id;
    this.appointmentService.getUserAppointments(id).subscribe((response)=>{
      const appointments = response.data;
      if(appointments.length > 0){
        this.upAppointment = appointments[0];
        console.log(this.upAppointment);
      }
    })
  }

}
