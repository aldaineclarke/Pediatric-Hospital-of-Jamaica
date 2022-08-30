import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/Interfaces/patient';

@Component({
  selector: 'hos-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  constructor() { }

  patients:Patient[] = [];

  ngOnInit(): void {
  }

  deletePatient(id:string){

  }
  findDoctorById(id:string){

  }

}
