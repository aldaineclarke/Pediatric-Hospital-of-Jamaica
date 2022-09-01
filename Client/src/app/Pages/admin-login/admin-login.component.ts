import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';
import {Location} from '@angular/common';

@Component({
  selector: 'hos-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router, private location: Location) { }



  serverError = "";
  adminLoginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })
  ngOnInit(): void {
  }

  loginUser(){
    this.usersService.loginUser(this.adminLoginForm.value).subscribe({
      next: (response)=>{
        if(response.data){
          localStorage.setItem("token",response.data);
          this.router.navigate(['/admin']);
        }
        
      },
      error: (error)=>{
        console.log(error)
        this.serverError = error.toString().slice(7);

      }
    })
  }
  goBack(){
    this.location.back();
 }

}
