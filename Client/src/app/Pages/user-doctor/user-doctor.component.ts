import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-user-doctor',
  templateUrl: './user-doctor.component.html',
  styleUrls: ['./user-doctor.component.scss']
})
export class UserDoctorComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  doctors!:User[];

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors(){
    this.usersService.getAllDoctors().subscribe((response)=>{
      this.doctors = response.data;
      
    })
  }
  showApology(){
    alert("Unfortunately this feature hasn't been implemented yet.")
  }

}

