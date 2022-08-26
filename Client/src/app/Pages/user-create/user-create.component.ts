import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }
  userRole = "Customer"
  ngOnInit(): void {
    this.userRole = this.checkRole();
  }

  checkRole():string{
    if(location.href.indexOf("doctor") > -1){
      return "Doctor"
    }
    return "Customer"
  }

  addUserForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    gender: new FormControl('Male', Validators.required),
    title: new FormControl('Mr', Validators.required),
    department: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    isSuperAdmin: new FormControl(false, Validators.required),
  })

  createUser(){
    console.log(this.userRole);
    this.usersService.createUser(this.userRole,this.addUserForm.value).subscribe(()=>{
      this.router.navigateByUrl("/admin/doctors");

    })
  }

}
