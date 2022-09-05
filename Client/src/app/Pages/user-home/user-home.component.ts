import { Component, OnInit } from '@angular/core';
import { AppointmentPop } from 'src/app/Interfaces/appointment';
import { News } from 'src/app/Interfaces/news';
import { User } from 'src/app/Interfaces/user';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorService } from 'src/app/Services/vendor.service';

@Component({
  selector: 'hos-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  constructor(private authService: AuthService, private appointmentService: AppointmentService, private vendorService: VendorService) { }
  upAppointment!: AppointmentPop;

  mainNews:News[] = [];
  ngOnInit(): void {
    this.getUserAppointment();
    this.getNews();
  }

  getUserAppointment(){
    let id = this.authService.getUser()._id;
    this.appointmentService.getUserAppointments(id).subscribe((response)=>{
      const appointments = response.data;
      if(appointments.length > 0){
        this.upAppointment = appointments[0];
        console.log(this.upAppointment);
      }
    })
  }

  getNews(){
    this.vendorService.getAllHealthNews().subscribe((response)=>{
      this.mainNews = response.articles.slice(5,10);
    })
  }
  goToPage(route:string){
    location.href=route
  }

}
