import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router:Router) { }
  userLoginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })
  ngOnInit(): void {
  }

  loginUser(){
    this.usersService.loginUser(this.userLoginForm.value).subscribe((response)=>{
      this.router.navigate(['/user']);
    })
  }

}
