import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }



  serverError = "";
  adminLoginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })
  ngOnInit(): void {
  }

  loginUser(){
    this.usersService.loginUser(this.adminLoginForm.value).subscribe((response)=>{
      if(response.data){
        localStorage.setItem("token",response.data);
        this.router.navigate(['/admin']);
      }else{
        this.serverError = response.message as string;
      }

       
    })
  }

}
