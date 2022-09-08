import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';
import { User } from 'src/app/Interfaces/user';
import { DoctorService } from 'src/app/Services/doctor.service';
import { Doctor } from 'src/app/Interfaces/doctor';
@Component({
  selector: 'hos-user-dpctor-profile',
  templateUrl: './user-doctor-profile.component.html',
  styleUrls: ['./user-doctor-profile.component.scss']
})
export class UserDoctorProfileComponent implements OnInit {

  constructor( private location: Location, private route: ActivatedRoute, private router: Router, private doctorService: DoctorService) { }
  id = ""
  doctor!:Doctor;
  ngOnInit(): void {
    this.getDoctorFromRouteParams();
  }
  goBack(){
    this.location.back()
  }

  getDoctorFromRouteParams(){
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get("id") as string;
    });

    this.doctorService.getDoctorById(this.id).subscribe((response)=>{
      this.doctor = response.data;
    })
  }
  sendDoctorInfo(){
    this.router.navigateByUrl("/user/appointments/create", {state:{doctor_id:this.id}})
  }

}
