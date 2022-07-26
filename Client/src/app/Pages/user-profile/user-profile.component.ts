import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/Services/users.service';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'hos-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private location: Location, private usersService: UsersService, private authService: AuthService, private router: Router) { }

  passwordDisabled = true;

  updateProfileForm = new FormGroup({
    fname: new FormControl("", Validators.required),
    lname: new FormControl("", Validators.required),
    imageUrl: new FormControl(" ", Validators.required),
    username: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    street: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    parish: new FormControl("", Validators.required),
    password: new FormControl({value: "", disabled: this.passwordDisabled}, Validators.required),
    password2: new FormControl({value: "", disabled: this.passwordDisabled},Validators.required)

  });

  userInfo:any;
  user!:User;

  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUser();
    this.getUserInfo();
  }

  getUserInfo(){
    this.usersService.getUserById(this.userInfo._id).subscribe((response)=>{
      this.user = response.data;
      this.user.imageUrl = (this.user.imageUrl) ? this.user.imageUrl : "/assets/default-profile-img.png"; 
      this.updateProfileForm.setValue({
        fname: this.user.fname,
        lname: this.user.lname,
        email: this.user.email,
        username: this.user.username,
        imageUrl: "",
        phone: this.user.phone,
        street: (this.user.address)? this.user.address.street: " ",
        city: (this.user.address)? this.user.address.city: " ",
        parish: (this.user.address)? this.user.address.parish: " ",
        password: "",
        password2: "",
      })
    })
  }

  updateForm(){

    const formData = new FormData();

    const form = this.updateProfileForm.value;

    if(!this.passwordDisabled){
      const passwordCorrect = this.verifyPassword(this.updateProfileForm.get("password")?.value,this.updateProfileForm.get("password2")?.value )
      if(!passwordCorrect){
          this.updateProfileForm.get("password")?.setErrors({notMatched: true});
      }
    }else{
      console.log("password was not selected")
      delete form.password
      delete form.password2;
    }
    
    console.log(form);
    for (let i in form) {
      if (form[i] instanceof Blob){  //  Check if key value is file
        formData.append(i, form[i], form[i].name ? form[i].name : "");
      }
      else
      formData.append(i, form[i]);
    }

    this.usersService.updateUser(this.user._id, formData as Partial<User>).subscribe(()=>{
      this.router.navigate(["/user"])
    })
  }

  getFileData(event: Event){
    let extensionAllowed:{[key:string]:boolean} = {"png":true,"jpeg":true, "jpg":true};
    const fileElement = event.target as HTMLInputElement;

    if(fileElement.files){
      if (fileElement.files[0].size / 1024 / 1024 > 20) {
        alert("File size should be less than 20MB")
        return;
      }
      if (extensionAllowed) {
        let nam = fileElement.files[0].name.split('.').pop();
        if(nam){
          if (!extensionAllowed[nam]) {
            alert("Please upload " + Object.keys(extensionAllowed) + " file.")
            return;
          }
        }
      }

      this.updateProfileForm.controls["imageUrl"].setValue(fileElement.files[0] as File);
    }

    
    
  }
  togglePasswordEditState(inputElem: HTMLInputElement){

    if(inputElem.checked){
      this.passwordDisabled = false;
      this.updateProfileForm.get("password")?.enable()
      this.updateProfileForm.get("password2")?.enable()
    }else{
      this.updateProfileForm.get("password")?.disable()
      this.updateProfileForm.get("password2")?.disable()
      this.passwordDisabled = true;

    }
    console.log(this.updateProfileForm.get("password")?.disabled)
  }

  verifyPassword(password1:string, password2:string){
    if(password1 == password2){
      return true;
    }
    return false;
  }

}


