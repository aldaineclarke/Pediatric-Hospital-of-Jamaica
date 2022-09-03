import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AppointmentPop } from 'src/app/Interfaces/appointment';

@Component({
  selector: 'hos-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss']
})
export class AppointmentCardComponent implements OnInit, OnChanges {

  @Input("appointment") appointment!: AppointmentPop;
  month_day = ""
  time = " "
  doctor = ""
  specialty = ""
  imageSrc = "/assets/mother-two-her-sons-have-appointment-with-pediatrician.jpg";
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(){
    this.month_day = this.appointment.visitStart.toDateString().slice(4,11);
    this.time = this.appointment.visitStart.toLocaleTimeString("en-US", {timeStyle:"short"});
    this.doctor = this.appointment.doctor.title+ " "+ this.appointment.doctor.lname;
    this.specialty = this.appointment.doctor.department as string;
  }

}
