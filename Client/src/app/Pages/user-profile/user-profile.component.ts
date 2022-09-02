import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'hos-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private location: Location) { }

  updateProfileForm = new FormGroup({
    fname: new FormControl("", Validators.required),
    lname: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    street: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    parish: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),

  });

  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
  }

}
