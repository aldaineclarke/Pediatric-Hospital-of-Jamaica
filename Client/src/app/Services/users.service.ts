import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_Response, User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private  USERS_ENDPOINT = "http://localhost:3000/api/v1/users"
  constructor(private _http: HttpClient) { }

  /**
   * ### Description
   * Gets all the users from the database that matches the role that is passed to the method. If no user is passed then it assumes that the user is a customer
   * @param role {string} default value for the method
   * @returns 
   */
  getAllUsers(role="Customer"):Observable<API_Response<User[]>>{
    return this._http.get<API_Response<User[]>>(this.USERS_ENDPOINT)
  }
  getUserById(role="Customer"):Observable<API_Response<User>>{
    return this._http.get<API_Response<User>>(this.USERS_ENDPOINT)
  }
  createUser(role="Customer", data: Partial<User>){
    return this._http.post(this.USERS_ENDPOINT, data);
  }
  updateUser(role="Customer", changes: Partial<User>){
    return this._http.patch(this.USERS_ENDPOINT, changes);
  }

}
