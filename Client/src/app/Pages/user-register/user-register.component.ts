import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';
import Swal from "sweetalert2";

@Component({
  selector: 'hos-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  constructor(private location: Location, private router: Router, private usersService: UsersService) { }

  get password (){
    return this.signUpForm.get("password")?.value
  }
  get password2 (){
    return this.signUpForm.get("password2")?.value
  }

  ngOnInit(): void {
  }

  signUpForm = new FormGroup({
    fname: new FormControl('', Validators.required),
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
    console.log(data);
    if(this.signUpForm.valid){
      
      Swal.fire("Signup Successful", "", "success")

      this.usersService.createUser(data).subscribe(()=>{
        Swal.fire("User created Successful", "", "success")
  
        this.router.navigate(["/user/login"]);
      })
    }else{
      Swal.fire("Form Invalid", "", "error")
    }
   
  }
}
