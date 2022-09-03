import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-doctor-create',
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.scss']
})
export class DoctorCreateComponent implements OnInit {

  constructor(private doctorService: DoctorService, private router: Router) { }
  ngOnInit(): void {
  }

  addDoctorForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    isSuperAdmin: new FormControl(false, Validators.required),
  })

  createUser(){
    this.doctorService.createDoctor(this.addDoctorForm.value).subscribe(()=>{
      this.router.navigateByUrl("/admin/doctors");

    })
  }

}
