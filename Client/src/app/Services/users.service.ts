import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, tap, BehaviorSubject } from 'rxjs';
import { API_Response, User } from '../Interfaces/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private  USERS_ENDPOINT = "http://10.44.16.32:3000/api/v1/users";

  private userSubject = new BehaviorSubject<User | null>(null);

  public user$:Observable<User | null> = this.userSubject.asObservable();

  createUserLoginSession(user:User){
    this.userSubject.next(user);
  }
  removeUserLoginSession(){
    this.userSubject.next(null);
  }

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
      tap(this.handleSuccess),
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
          this.createUserLoginSession(response.data.user);
          localStorage.setItem("token",response.data.token);
          Swal.fire(
            'Login Successful',
            'success'
          )
        }
      }),
    )
  }

}
