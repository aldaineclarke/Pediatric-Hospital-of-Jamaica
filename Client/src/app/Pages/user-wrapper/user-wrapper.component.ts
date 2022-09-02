import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hos-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrls: ['./user-wrapper.component.scss']
})
export class UserWrapperComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navOpened: boolean = false

  toggleNav(){
    this.navOpened = !this.navOpened;
  }

  logoutUser(){
    localStorage.removeItem("token");
    this.router.navigate(["user/login"]);
  }
}
