import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { AdminHomeComponent } from './Pages/admin-home/admin-home.component';
import { AdminLoginComponent } from './Pages/admin-login/admin-login.component';
import { AppointmentCreateComponent } from './Pages/appointment-create/appointment-create.component';
import { AppointmentEditComponent } from './Pages/appointment-edit/appointment-edit.component';
import { AppointmentComponent } from './Pages/appointment/appointment.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { DoctorsComponent } from './Pages/doctors/doctors.component';
import { HomeComponent } from './Pages/home/home.component';
import { PatientCreateComponent } from './Pages/patient-create/patient-create.component';
import { PatientComponent } from './Pages/patient/patient.component';
import { UserAppointmentCreateComponent } from './Pages/user-appointment-create/user-appointment-create.component';
import { UserAppointmentsComponent } from './Pages/user-appointments/user-appointments.component';
import { UserCreateComponent } from './Pages/user-create/user-create.component';
import { UserDoctorComponent } from './Pages/user-doctor/user-doctor.component';
import { UserEditComponent } from './Pages/user-edit/user-edit.component';
import { UserHomeComponent } from './Pages/user-home/user-home.component';
import { UserLoginComponent } from './Pages/user-login/user-login.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';
import { UserWrapperComponent } from './Pages/user-wrapper/user-wrapper.component';
import { NavService } from './Services/nav.service';

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent,
  },{
    path:"",
    pathMatch:"full",
    redirectTo:"home"
  },
  {path:"admin/login", component: AdminLoginComponent},
  {
    path:"admin",component:AdminHomeComponent,
    children:[
      {path:"", component:DashboardComponent},
      {path:"doctors", component:DoctorsComponent},
      {path:"doctors/edit/:id", component: UserEditComponent},
      {path:"doctors/create", component: UserCreateComponent},
      {path:"appointments", component: AppointmentComponent},
      {path:"appointments/create", component: AppointmentCreateComponent},
      {path:"appointments/edit/:id", component: AppointmentEditComponent},
      {path:"patients", component: PatientComponent},
      {path:"patients/create", component: PatientCreateComponent},
      {path:"patients/edit/:id", component: PatientComponent},
    ],
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard]
  },
  {path: "user/login", component: UserLoginComponent}, 
  {path: "user", component: UserWrapperComponent, children:[
    {path:"", component:UserHomeComponent},
    {path:"appointments", component: UserAppointmentsComponent},
    {path:"appointments/create", component: UserAppointmentCreateComponent},
    {path:"doctors", component: UserDoctorComponent},
  ]},
  {path:"user/profile", component: UserProfileComponent},
  {path: "**", redirectTo:"home", pathMatch:"full"}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router:Router, private navService: NavService){
    this.router.events.subscribe((res)=>{
        if(location.href.indexOf("user") > -1){
          return this.navService.removeOriginalNav();
        }
        if(location.href.indexOf("admin") > -1){
          this.navService.removeOriginalNav();
        }else if(location.href.indexOf("admin") == -1 ){
          this.navService.addOriginalNav();
        }
    })
  }
}
