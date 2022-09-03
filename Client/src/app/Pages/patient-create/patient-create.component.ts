import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from 'src/app/Interfaces/doctor';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'hos-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.scss']
})
export class PatientCreateComponent implements OnInit {

  constructor(private doctorService: DoctorService) { }

  doctors: Doctor[] = [];
  
  ngOnInit(): void {

    this.getAllDoctors();
  }
  addPatientForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    mname:new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    DOB: new FormControl('', Validators.required),
    patientImage: new FormControl('', Validators.required),
    guardian_fname:new FormControl('', Validators.required),
    guardian_lname:new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    city:new FormControl('', Validators.required),
    parish: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    gender:new FormControl('', Validators.required),
    allergies: new FormControl('', Validators.required),
    nationality:new FormControl('', Validators.required),
    admission_date:new FormControl(new Date().toString(), Validators.required),
    admit_doctor: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required)
  });

  getAllDoctors(){
    this.doctorService.getAllDoctors().subscribe(response =>{
      this.doctors = response.data;
    })
  }
  createPatient(){
    console.log(this.addPatientForm.value);
  }
}
