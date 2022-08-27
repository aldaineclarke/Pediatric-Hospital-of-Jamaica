import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { AdminHomeComponent } from './Pages/admin-home/admin-home.component';
import { AdminLoginComponent } from './Pages/admin-login/admin-login.component';
import { AppointmentCreateComponent } from './Pages/appointment-create/appointment-create.component';
import { AppointmentComponent } from './Pages/appointment/appointment.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { DoctorsComponent } from './Pages/doctors/doctors.component';
import { HomeComponent } from './Pages/home/home.component';
import { UserCreateComponent } from './Pages/user-create/user-create.component';
import { UserEditComponent } from './Pages/user-edit/user-edit.component';
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
      // {path:"doctors/create", component: UserCreateComponent},
    ],
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard]
  },
  {path: "**", redirectTo:"home", pathMatch:"full"}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router:Router, private navService: NavService){
    this.router.events.subscribe((res)=>{
        if(location.href.indexOf("admin") > -1){
          this.navService.removeOriginalNav();
        }else if(location.href.indexOf("admin") == -1 ){
          this.navService.addOriginalNav();
        }
    })
  }
}
