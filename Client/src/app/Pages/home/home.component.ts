import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { News } from 'src/app/Interfaces/news';
import { VendorService } from 'src/app/Services/vendor.service';

@Component({
  selector: 'hos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private vendorService: VendorService) { }
  
  counters:{[key: string]:{start:number}} = {patient: {start:300}, capacity:{start: 150}, doctor:{start: 1500}, experience:{start:18}};
  countersArr = ["patient", "capacity", "doctor", "experience"]

  mainNews!: News ;
  otherNews: News[] = [];
  @ViewChild("statistics") statistics!: ElementRef;

  ngOnInit(): void {
    this.vendorService.getAllHealthNews().subscribe((data)=>{
      this.mainNews = data.articles[0];
      this.otherNews = data.articles.slice(1,4);
    });

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
