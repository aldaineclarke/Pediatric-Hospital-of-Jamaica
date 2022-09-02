import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrls: ['./user-wrapper.component.scss']
})
export class UserWrapperComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  user!: User;
  navOpened: boolean = false

  toggleNav(){
    this.navOpened = !this.navOpened;
  }

  getUserInfo(){
    const id = this.authService.getUser()._id;
    console.log(id);
    this.usersService.getUserById(id).subscribe((response)=>{
        this.user = response.data;
    })
  }

  logoutUser(){
    localStorage.removeItem("token");
    this.router.navigate(["user/login"]);
  }
}
