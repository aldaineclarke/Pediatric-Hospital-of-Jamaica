import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  showDropdown = false;
  doctors: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getDoctors()
  }

  showActions(){
    this.showDropdown = !this.showDropdown;
  }
  getDoctors(){
    this.usersService.getAllDoctors().subscribe((response)=>{
      this.doctors = response.data;
      console.log(this.doctors)
    })
  }
  deleteUser(id:string){
    if(confirm('Are you sure you want to delete')){
      this.usersService.deleteUser(id).subscribe(()=>{
        this.doctors = this.doctors.filter((user)=> user._id != id)
      })
    }
  }

}
