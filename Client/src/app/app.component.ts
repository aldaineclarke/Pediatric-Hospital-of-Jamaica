import { Component } from '@angular/core';
import { NavService } from './Services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Client';
  constructor(public navService: NavService){


  }
  ngOnInit(): void {

  }
}
