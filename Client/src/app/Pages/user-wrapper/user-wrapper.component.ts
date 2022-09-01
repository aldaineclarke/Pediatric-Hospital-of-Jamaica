import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hos-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrls: ['./user-wrapper.component.scss']
})
export class UserWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navOpened: boolean = false

  toggleNav(){
    this.navOpened = !this.navOpened;
    console.log("clicked")
  }
}
