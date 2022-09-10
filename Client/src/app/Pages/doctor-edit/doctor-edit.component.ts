import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/Interfaces/doctor';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'hos-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss']
})
export class DoctorEditComponent implements OnInit {

  constructor(private doctorService: DoctorService, private route: ActivatedRoute, private router: Router) { 
    
  }
  doctor !: Doctor;

  editDoctorForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    title: new FormControl('Mr', Validators.required),
    department: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    isSuperAdmin: new FormControl(false, Validators.required),

  })
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.route.paramMap.subscribe((params)=>{
      let id = params.get("id") as string;
      this.doctorService.getDoctorById(id).subscribe((response)=>{
        this.doctor = response.data;
        console.log(this.doctor)
        this.editDoctorForm.setValue({
          fname: this.doctor.fname,
          lname: this.doctor.lname,
          username: this.doctor.username,
          email: this.doctor.email,
          department: this.doctor.department,
          phone: this.doctor.phone,
          title: this.doctor.title,
          isSuperAdmin: this.doctor.isSuperAdmin,
        })
      })
    })
  }

  submitForm(){
    this.doctorService.updateDoctor(this.doctor._id, this.editDoctorForm.value).subscribe(()=>{
      this.router.navigateByUrl("/admin/doctors");
    })
  }

}
