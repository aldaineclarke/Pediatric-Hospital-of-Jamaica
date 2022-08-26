import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  user = "Doctor";
  showDropdown = false;
  doctors: User[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getAllUsers(this.user).subscribe((response)=>{
      this.doctors = response.data;
    })
  }

  showActions(){
    this.showDropdown = !this.showDropdown;
  }

}
