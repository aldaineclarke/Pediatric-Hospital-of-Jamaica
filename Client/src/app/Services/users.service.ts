import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, tap, BehaviorSubject } from 'rxjs';
import { API_Response, User } from '../Interfaces/user';
import Swal from 'sweetalert2';
import { baseUrl } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private  USERS_ENDPOINT = `${baseUrl}/users`;

  // private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());

  // public user$:Observable<User | null> = this.userSubject.asObservable();

  // public getUserFromStorage(): User | null{
  //   let user = localStorage.getItem("User")
  //   if(user){
  //     return JSON.parse(user)
  //   }
  //   return null
  // }
  constructor(private _http: HttpClient) { }

  private handleErrror(error:any, status:string) { 
    let message = ""
      if(error.error.message){
        message = error.error.message;
        Swal.fire(
          status,
          message,
          'error'
        )
      }else if(error.status == 0){
        Swal.fire(status, error.statusText, "error");
      }
    return throwError(()=> new Error(message));
  };

  private handleSuccess<T>(response:API_Response<T>){
    if(response.status == "Success"){
      Swal.fire(response.status, response.message, "success");
    }else if(response.status == "Failed"){
      Swal.fire(response.status, response.message, "error");
    }
  }


  getAllUsers():Observable<API_Response<User[]>>{
    return this._http.get<API_Response<User[]>>(this.USERS_ENDPOINT)
  }
  getUserById(id:string):Observable<API_Response<User>>{
    return this._http.get<API_Response<User>>(this.USERS_ENDPOINT+ "/"+id)
    .pipe(
      // tap(this.handleSuccess),
      catchError((error)=>this.handleErrror(error,"User not found"))
    )
  }
  createUser(data: Partial<User>){
    return this._http.post<API_Response<User>>(this.USERS_ENDPOINT, data)
    .pipe(
      tap(this.handleSuccess),
      catchError((error)=> this.handleErrror(error, "Registration Failed"))
    )
  }
  updateUser(id: string, changes: Partial<User>){
    return this._http.patch<API_Response<User>>(this.USERS_ENDPOINT+"/"+ id, changes)
    .pipe(
      tap((response)=> {
        // resets local storage of user when user is updated for data consistency.
        // localStorage.setItem("User", JSON.stringify(response.data))
        this.handleSuccess(response)
      }),
      catchError((error)=> this.handleErrror(error, "Update Failed"))
    );
  }
  deleteUser(id:string){
    return this._http.delete(this.USERS_ENDPOINT+ "/"+id)

  }

  loginUser(data:Partial<User>){
    return this._http.post<API_Response<{user:User, token:string}>>(this.USERS_ENDPOINT+"/login",data)
    .pipe(
      catchError((error)=>  this.handleErrror(error, "Authentication Failed")),
      tap((response)=>{
        if(response.data){
          // this.userSubject.next(response.data.user);
          localStorage.setItem("token",response.data.token);
          // localStorage.setItem("User", JSON.stringify(response.data.user))
          Swal.fire(
            'Login Successful',
            'success'
          )
        }
      }),
    )
  }

  logoutUser(){
    localStorage.removeItem("token")
  }

}
