import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor.service';
import { Doctor } from 'src/app/Interfaces/doctor';
import { UsersService } from 'src/app/Services/users.service';
import { User } from 'src/app/Interfaces/user';
@Component({
  selector: 'hos-user-appointment-create',
  templateUrl: './user-appointment-create.component.html',
  styleUrls: ['./user-appointment-create.component.scss']
})
export class UserAppointmentCreateComponent implements OnInit, AfterViewInit{

  constructor(private location: Location, private authService: AuthService, private appointmentService: AppointmentService, private router:Router, private doctorService: DoctorService, private usersService: UsersService) { }
  user = this.authService.getUser();
  currentUser!: User;

  @ViewChild("fillData") fillDataCheckbox!:ElementRef<HTMLInputElement>
  doctors:Doctor[] = []
  ngOnInit(): void {
    console.log( this.authService.getUser())
    this.getAllDoctors();
    this.getCurrentUser();
    
  }


  ngAfterViewInit(): void {
      this.fillDataCheckbox.nativeElement.addEventListener(("click"),()=>{
        if(this.fillDataCheckbox.nativeElement.checked){
          this.fillFormWithData()
        }else{
          this.appointmentForm.reset();
        }
      })  
  }
  appointmentForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl(''),
    specialty: new FormControl('', Validators.required),
    doctor: new FormControl('', Validators.required),
    visitStart: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
  })

  goBack(){
    this.location.back();
  }

  submitForm(){
    let data = this.appointmentForm.value;
    data.userId = this.user._id;
    console.log(data);
    this.appointmentService.createAppointment(data).subscribe(()=>{
      this.router.navigate(["/user/appointments"])
    })
  }

  getAllDoctors(){
    this.doctorService.getAllDoctors().subscribe((response)=>{
      this.doctors = response.data;
      console.log(this.doctors);

    })
  }
  getCurrentUser(){
    this.usersService.getUserById(this.user._id).subscribe((response)=>{
      this.currentUser = response.data;
    })
  }
  fillFormWithData(){
    this.appointmentForm.get("fname")?.setValue(this.currentUser.fname),
    this.appointmentForm.get("lname")?.setValue(this.currentUser.lname),
    this.appointmentForm.get("email")?.setValue(this.currentUser.email),
    this.appointmentForm.get("phone")?.setValue(this.currentUser.phone)

  }
}
