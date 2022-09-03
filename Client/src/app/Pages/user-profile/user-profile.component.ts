import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/Services/users.service';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'hos-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private location: Location, private usersService: UsersService, private authService: AuthService, private router: Router) { }

  updateProfileForm = new FormGroup({
    fname: new FormControl("", Validators.required),
    lname: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    street: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    parish: new FormControl("", Validators.required),

  });

  userInfo:any;
  user!:User;

  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUser();
    this.getUserInfo();
  }

  getUserInfo(){
    this.usersService.getUserById(this.userInfo._id).subscribe((response)=>{
      this.user = response.data;
      console.log(this.user)
      this.updateProfileForm.setValue({
        fname: this.user.fname,
        lname: this.user.lname,
        email: this.user.email,
        username: this.user.username,
        phone: this.user.phone,
        street: (this.user.address)? this.user.address.street: " ",
        city: (this.user.address)? this.user.address.city: " ",
        parish: (this.user.address)? this.user.address.parish: " ",

      })
    })
  }

  updateForm(){
    this.usersService.updateUser(this.user._id, this.updateProfileForm.value).subscribe(()=>{
      this.router.navigate(["/user"])
    })
  }

}
