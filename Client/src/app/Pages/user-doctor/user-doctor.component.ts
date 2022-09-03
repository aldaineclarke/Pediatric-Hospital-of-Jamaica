import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/Interfaces/doctor';
import { User } from 'src/app/Interfaces/user';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-user-doctor',
  templateUrl: './user-doctor.component.html',
  styleUrls: ['./user-doctor.component.scss']
})
export class UserDoctorComponent implements OnInit {

  constructor(private doctorService: DoctorService) { }

  doctors!:Doctor[];

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors(){
    this.doctorService.getAllDoctors().subscribe((response)=>{
      this.doctors = response.data;

    })
  }
  showApology(){
    alert("Unfortunately this feature hasn't been implemented yet.")
  }

}

