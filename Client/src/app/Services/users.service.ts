import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, tap } from 'rxjs';
import { API_Response, User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private  USERS_ENDPOINT = "http://localhost:3000/api/v1/users"
  constructor(private _http: HttpClient) { }

  private handleErrror(error:any) {
    let message = ""
      if(error.error.message){
        message = error.error.message;
      }else message = error;
    return throwError(()=> new Error(message));
  }

  /**
   * ### Description
   * Gets all the users from the database that matches the role that is passed to the method. If no user is passed then it assumes that the user is a customer
   * @param role {string} default value for the method
   * @returns 
   */
  getAllUsers():Observable<API_Response<User[]>>{
    return this._http.get<API_Response<User[]>>(this.USERS_ENDPOINT)
  }
  getUserById(id:string):Observable<API_Response<User>>{
    return this._http.get<API_Response<User>>(this.USERS_ENDPOINT+ "/"+id)
  }
  createUser(data: Partial<User>){
    data.role = "Customer";
    return this._http.post(this.USERS_ENDPOINT, data);
  }
  createDoctor(data: Partial<User>){
    data.role = "Doctor";
    return this._http.post(this.USERS_ENDPOINT, data);
  }
  updateUser(id: string, changes: Partial<User>){
    return this._http.patch(this.USERS_ENDPOINT+"/"+ id, changes);
  }
  deleteUser(id:string){
    return this._http.delete(this.USERS_ENDPOINT+ "/"+id);
  }
  getAllDoctors():Observable<API_Response<User[]>>{
    return this._http.get<API_Response<User[]>>(this.USERS_ENDPOINT + "?role=Doctor");
  }
  loginUser(data:Partial<User>){
    return this._http.post<API_Response<string>>(this.USERS_ENDPOINT+"/login",data)
    .pipe(
      tap((response)=>{
        if(response.data){
          localStorage.setItem("token",response.data);
        }
      }),
      catchError(this.handleErrror)
    )
  }

}
