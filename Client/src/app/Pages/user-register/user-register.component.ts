import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  constructor(private location: Location, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  signUpForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
  })

  goBack(){
    this.location.back();
  }
  submitForm(){
    const data = this.signUpForm.value;
    console.log(data)
    this.usersService.createUser("Customer",data).subscribe(()=>{
      this.router.navigate(["/user/login"]);
    })
  }

}
