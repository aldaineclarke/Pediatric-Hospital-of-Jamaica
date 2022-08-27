import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Interfaces/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss']
})
export class AppointmentCreateComponent implements OnInit {

  constructor(private usersService: UsersService) { }
  doctors:User[] = [];
  doctorsPool:User[] = [];
  ngOnInit(): void {

    this.getAllDoctors();
    this.appointmentCreationForm.get("specialty")?.valueChanges.subscribe((change)=>{
      this.doctorsPool = this.doctors.filter((doc)=>{
        console.log(change)
        return doc.department == change;
      })
    })
  }
  appointmentCreationForm = new FormGroup({
    doctor: new FormControl("", Validators.required),
    fname: new FormControl("", Validators.required),
    title: new FormControl("", Validators.required),
    lname: new FormControl("", Validators.required),
    gender: new FormControl("Male", Validators.required),
    phone: new FormControl("", Validators.required),
    visitStart: new FormControl("", Validators.required),
    notes: new FormControl("", Validators.required),
    specialty: new FormControl("", Validators.required),
  })

  


  getAllDoctors(){
    this.usersService.getAllUsers("Doctor").subscribe((response)=>{
      this.doctors = response.data;
      this.doctorsPool = this.doctors;
    })
  }
  submitForm(){

  }

}
