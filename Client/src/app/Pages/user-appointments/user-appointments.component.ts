import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment, AppointmentPop } from 'src/app/Interfaces/appointment';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from "sweetalert2";
@Component({
  selector: 'hos-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.scss']
})
export class UserAppointmentsComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private authService: AuthService, private router: Router) { }
  userAppointments:AppointmentPop[] = [];
  userData = this.authService.getUser()
  appointment!:AppointmentPop;

  ngOnInit(): void {
    console.log(this.authService.getUser())
    this.getAllAppointments();
  }
  getAllAppointments(){
    this.appointmentService.getUserAppointments(this.userData._id).subscribe((response)=>{
      this.userAppointments = response.data;
      if(this.userAppointments.length > 0){

        this.appointment = this.userAppointments[0];
        console.log(this.appointment)
      }

      this.userAppointments.forEach((appointment)=>{
        appointment.visitStart = new Date(appointment.visitStart);
      })
      console.log(this.userAppointments);
    })
  }
  deleteAppointment(id: string){

    Swal.fire({
      title: 'You are about to Delete this appointment, Continue?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Appointment Deleted', '', 'success');
        this.appointmentService.deleteAppointment(id).subscribe(()=>{
          this.userAppointments = this.userAppointments.filter((appointment)=>{
            appointment._id != id;
          });
          this.router.navigate(['/user/appointments'])
        });

      } 
    })
  }

}
