import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  year = new Date().getFullYear();
  submitNewsletter(){
    alert("Newsletter subscription comming soon")
  }

}
