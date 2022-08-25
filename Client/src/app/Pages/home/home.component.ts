import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/Interfaces/news';
import { VendorService } from 'src/app/Services/vendor.service';

@Component({
  selector: 'hos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private vendorService: VendorService) { }

  mainNews!: News ;
  otherNews: News[] = [];

  ngOnInit(): void {
    this.vendorService.getAllHealthNews().subscribe((data)=>{
      this.mainNews = data.articles[0];
      this.otherNews = data.articles.slice(1,4);
    })

  }
  convertStringToDate(date:string){
    return new Date(date).toDateString().slice(3)
  }
  goToPage(url:string){
    location.href= url;
  }

}
