import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'hos-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) { 
    
  }
  user !: User;

  editUserForm = new FormGroup({
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
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.route.paramMap.subscribe((params)=>{
      let id = params.get("id") as string;
      this.usersService.getUserById(id).subscribe((response)=>{
        this.user = response.data;
        console.log(this.user)
        this.editUserForm.setValue({
          fname: this.user.fname,
          lname: this.user.lname,
          username: this.user.username,
          email: this.user.email,
          department: this.user.department,
          phone: this.user.phone,
          gender: this.user.gender,
          title: this.user.title,
          isSuperAdmin: this.user.isSuperAdmin,
        })
      })
    })
  }

  submitForm(){
    this.usersService.updateUser(this.user._id, this.editUserForm.value).subscribe(()=>{
      this.router.navigateByUrl("/admin/doctors");
    })
  }

}
