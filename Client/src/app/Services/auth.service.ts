import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    
  }
  /**
   * ### Description
   * Checks the localStorage to see if there is a token present. If there is a token, retrieve the token and check if the token has expired using the jwtHelper.
   */
  public isAuthenticated = ():boolean =>{
      const token = localStorage.getItem('token') as string;
      
      return !jwtHelper.isTokenExpired(token);
  }
}
