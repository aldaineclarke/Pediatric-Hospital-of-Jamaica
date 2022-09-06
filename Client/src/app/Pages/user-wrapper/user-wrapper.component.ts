import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2';

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
    Swal.fire(
      'Login Successful',
      'success'
    )
    Swal.fire({
      title: 'You are about to logout, Continue?',
      showCancelButton: true,
      confirmButtonText: 'Logout',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('User logged out!', '', 'success');
        localStorage.removeItem("token");
        this.router.navigate(["user/login"]);

      } 
    })
    
  }

  apologize(){
    alert("We apologize, Route is under construction");
    this.toggleNav();
  }
}
