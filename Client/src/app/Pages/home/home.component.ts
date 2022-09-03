import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { News } from 'src/app/Interfaces/news';
import { User } from 'src/app/Interfaces/user';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { UsersService } from 'src/app/Services/users.service';
import { VendorService } from 'src/app/Services/vendor.service';

@Component({
  selector: 'hos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private vendorService: VendorService, private appointmentService: AppointmentService, private usersService:UsersService) { }
  
  counters:{[key: string]:{start:number}} = {patient: {start:300}, capacity:{start: 150}, doctor:{start: 1500}, experience:{start:18}};
  specialties = ["Surgeon", "Dentist", "Radiologist", "Pulmonologist","Radiologist","Cardiologist"]
  mainNews!: News ;
  otherNews: News[] = [];
  currentDateTime = new Date().toJSON();

  @ViewChild("statistics") statistics!: ElementRef;
  
  doctors: User[] = [];
  doctorsPool: User[] = [];
  quickAppointmentForm = new FormGroup({
    email: new FormControl("", Validators.required),
    doc: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    visitStart: new FormControl("", Validators.required),
    specialty: new FormControl("Surgeon", Validators.required)
  });

  submitForm(){
    let [fname, lname] = this.quickAppointmentForm.get("name")?.value.split(" ");
    console.log(this.quickAppointmentForm.get("doctor")?.value)
    let data = {
      fname: fname,
      lname: lname,
      email: this.quickAppointmentForm.get("email")?.value,
      doctor: this.quickAppointmentForm.get("doc")?.value,
      visitStart: this.quickAppointmentForm.get("visitStart")?.value,

    }
    this.appointmentService.createAppointment(data).subscribe(()=>{
      alert("Appointment was set successfully");
      this.quickAppointmentForm.reset();
    })
  }


  ngOnInit(): void {
    this.vendorService.getAllHealthNews().subscribe((data)=>{
      this.mainNews = data.articles[0];
      this.otherNews = data.articles.slice(1,4);
    });
    this.getAllDoctors();
    
    this.quickAppointmentForm.get("specialty")?.valueChanges.subscribe((change)=>{
      this.doctorsPool = this.doctors.filter((doc)=>{
        return doc.department == change;
      });
    });
  }

  getAllDoctors(){
    this.usersService.getAllDoctors().subscribe((response)=>{
      this.doctors = response.data;
      this.doctorsPool = this.doctors;
    })
  }

 

  ngAfterViewInit(): void {
    console.log(this.statistics)

    this.countIntersectionObserverInit();

  }
  convertStringToDate(date:string){
    return new Date(date).toDateString().slice(3)
  }
  goToPage(url:string){
    location.href= url;
  }

  intervalCounter(startNum = 0, prop:string, duration:number){
    let temp = this.counters[prop].start;
    this.counters[prop].start = startNum;
    let countInterval = setInterval(()=>{
      console.log("Counting");
      this.counters[prop].start = this.counters[prop].start + 1;
      if(this.counters[prop].start >= temp){
        return clear();
      }
    }, duration/temp);

    function clear(){
     clearInterval(countInterval)
    }
  }

  countIntersectionObserverInit(){
    let observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach((entry)=>{
          if(entry.isIntersecting){
            console.log("Intersection")
                for(let counter in this.counters){
                  console.log(counter)
                  this.intervalCounter(0,counter, 2000)
                }
          
              observer.unobserve(entry.target)
          }
        })
    },{ rootMargin:"200px", threshold:1});

    observer.observe(this.statistics.nativeElement);
  }




}
