import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }

  navSubject = new BehaviorSubject<boolean>(false);
  navState$ = this.navSubject.asObservable();

  addOriginalNav(){
    this.navSubject.next(true);
  }
  removeOriginalNav(){
    this.navSubject.next(false);
  }

}
