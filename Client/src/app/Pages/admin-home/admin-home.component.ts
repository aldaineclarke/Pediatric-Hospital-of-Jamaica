import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'hos-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor( private router: Router) { }
  username = ""
  ngOnInit(): void {
    let token = decode(localStorage.getItem("token") as string);
    console.log(token);
    this.username = (token as any).username
  }
  logoutUser(){
    localStorage.removeItem("token");
    this.router.navigate(["admin/login"]);
  }

}
