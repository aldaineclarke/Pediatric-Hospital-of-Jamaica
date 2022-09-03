import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/Interfaces/doctor';
import { User } from 'src/app/Interfaces/user';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  showDropdown = false;
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getDoctors()
  }

  showActions(){
    this.showDropdown = !this.showDropdown;
  }
  getDoctors(){
    this.doctorService.getAllDoctors().subscribe((response)=>{
      this.doctors = response.data;
      console.log(this.doctors)
    })
  }
  deleteUser(id:string){
    if(confirm('Are you sure you want to delete')){
      this.doctorService.deleteDoctor(id).subscribe(()=>{
        this.doctors = this.doctors.filter((user)=> user._id != id)
      })
    }
  }

}
