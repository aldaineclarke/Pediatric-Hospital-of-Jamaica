import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, tap } from 'rxjs';
import { API_Response, User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private  USERS_ENDPOINT = "https://phj-app.herokuapp.com/api/v1/users"
  constructor(private _http: HttpClient) { }

  private handleErrror(error:any) {
    let message = ""
      if(error.error.message){
        message = error.error.message;
      }else message = error;
    return throwError(()=> new Error(message));
  }

  getAllUsers():Observable<API_Response<User[]>>{
    return this._http.get<API_Response<User[]>>(this.USERS_ENDPOINT)
  }
  getUserById(id:string):Observable<API_Response<User>>{
    return this._http.get<API_Response<User>>(this.USERS_ENDPOINT+ "/"+id)
  }
  createUser(data: Partial<User>){
    return this._http.post(this.USERS_ENDPOINT, data);
  }
  updateUser(id: string, changes: Partial<User>){
    return this._http.patch(this.USERS_ENDPOINT+"/"+ id, changes);
  }
  deleteUser(id:string){
    return this._http.delete(this.USERS_ENDPOINT+ "/"+id);
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
