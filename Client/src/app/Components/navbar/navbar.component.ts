import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hos-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  apologize(){
    alert("These pages are under construction")
  }

}
