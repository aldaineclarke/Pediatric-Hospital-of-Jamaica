import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'hos-user-appointment-create',
  templateUrl: './user-appointment-create.component.html',
  styleUrls: ['./user-appointment-create.component.scss']
})
export class UserAppointmentCreateComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  appointmentForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    gender: new FormControl('Male', Validators.required),
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

}
