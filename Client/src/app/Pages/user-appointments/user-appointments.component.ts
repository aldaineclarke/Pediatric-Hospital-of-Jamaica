import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentPop } from 'src/app/Interfaces/appointment';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'hos-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.scss']
})
export class UserAppointmentsComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private authService: AuthService) { }
  userAppointments:AppointmentPop[] = [];
  userData = this.authService.getUser()


  ngOnInit(): void {
    console.log(this.authService.getUser())
    this.getAllAppointments();
  }
  getAllAppointments(){
    this.appointmentService.getUserAppointments(this.userData._id).subscribe((response)=>{
      this.userAppointments = response.data
      console.log(this.userAppointments);
    })
  }

}
