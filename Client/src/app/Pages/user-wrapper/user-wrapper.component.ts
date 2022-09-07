import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  user$!: Observable<User | null>
  ngOnInit(): void {
    this.user$ = this.usersService.user$; 
    console.log(this.user$)
  }

  navOpened: boolean = false

  toggleNav(){
    this.navOpened = !this.navOpened;
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
        this.usersService.logoutUser();
        this.router.navigate(["user/login"]);

      } 
    })
    
  }

  apologize(){
    alert("We apologize, Route is under construction");
    this.toggleNav();
  }
}
