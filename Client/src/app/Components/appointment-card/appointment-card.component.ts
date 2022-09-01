import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hos-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss']
})
export class AppointmentCardComponent implements OnInit {

  @Input() dataPresent!: boolean;
  month_day = "Aug 22";
  time = "10: 20AM"
  doctor = "Dr. Warren";
  specialty = "Dentist";
  imageSrc = "/assets/mother-two-her-sons-have-appointment-with-pediatrician.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
