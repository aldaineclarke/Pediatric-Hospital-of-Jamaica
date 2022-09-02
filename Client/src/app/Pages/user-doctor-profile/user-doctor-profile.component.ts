import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'hos-user-dpctor-profile',
  templateUrl: './user-doctor-profile.component.html',
  styleUrls: ['./user-doctor-profile.component.scss']
})
export class UserDoctorProfileComponent implements OnInit {

  constructor( private location: Location) { }

  ngOnInit(): void {
  }
  goBack(){

  }

}
