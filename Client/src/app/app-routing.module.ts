import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './Pages/admin-home/admin-home.component';
import { AdminLoginComponent } from './Pages/admin-login/admin-login.component';
import { HomeComponent } from './Pages/home/home.component';
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
  {
    path:"admin",
    children:[
      {path: "", component:AdminHomeComponent},
      {path: "login", component:AdminLoginComponent},
    ]
  }

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router:Router, private navService: NavService){
    this.router.events.subscribe((res)=>{
        if(location.href.indexOf("admin") > -1){
          console.log(location.href.indexOf("admin"))
          this.navService.removeOriginalNav();
        }else if(location.href.indexOf("admin") == -1 ){
          console.log("admin")
          this.navService.addOriginalNav();
        }
    })
  }
}
