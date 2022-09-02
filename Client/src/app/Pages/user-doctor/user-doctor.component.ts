import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hos-user-doctor',
  templateUrl: './user-doctor.component.html',
  styleUrls: ['./user-doctor.component.scss']
})
export class UserDoctorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showApology(){
    alert("Unfortunately this feature hasn't been implemented yet.")
  }

}
