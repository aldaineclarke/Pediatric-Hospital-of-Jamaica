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
import { UserCreateComponent } from './Pages/user-create/user-create.component';
import { PatientComponent } from './Pages/patient/patient.component';
import { MedicalRecordsComponent } from './Pages/medical-records/medical-records.component';
import { AppointmentComponent } from './Pages/appointment/appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//ANGULAR MATERIAL COMPONENTS
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppointmentCreateComponent } from './Pages/appointment-create/appointment-create.component';
import { AppointmentEditComponent } from './Pages/appointment-edit/appointment-edit.component';
import { CalenderComponent } from './Components/calender/calender.component';
import { PatientCreateComponent } from './Pages/patient-create/patient-create.component';
import { UserLoginComponent } from './Pages/user-login/user-login.component';
import { UserHomeComponent } from './Pages/user-home/user-home.component';
import { UserWrapperComponent } from './Pages/user-wrapper/user-wrapper.component';
import { AppointmentCardComponent } from './Components/appointment-card/appointment-card.component';
import { UserAppointmentCreateComponent } from './Pages/user-appointment-create/user-appointment-create.component';
import { UserAppointmentsComponent } from './Pages/user-appointments/user-appointments.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';
import { UserDoctorComponent } from './Pages/user-doctor/user-doctor.component'

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
    UserCreateComponent,
    PatientComponent,
    MedicalRecordsComponent,
    AppointmentComponent,
    AppointmentCreateComponent,
    AppointmentEditComponent,
    CalenderComponent,
    PatientCreateComponent,
    UserLoginComponent,
    UserHomeComponent,
    UserWrapperComponent,
    AppointmentCardComponent,
    UserAppointmentCreateComponent,
    UserAppointmentsComponent,
    UserProfileComponent,
    UserDoctorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    //Material modules
    MatTableModule,
    MatPaginatorModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
