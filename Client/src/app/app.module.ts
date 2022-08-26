import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Pages/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AdminHomeComponent } from './Pages/admin-home/admin-home.component';
import { AdminLoginComponent } from './Pages/admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { DoctorsComponent } from './Pages/doctors/doctors.component';
import { UserEditComponent } from './Pages/user-edit/user-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    DashboardComponent,
    DoctorsComponent,
    
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
