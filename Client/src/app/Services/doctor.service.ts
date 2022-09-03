import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { API_Response, User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _http: HttpClient) { }
  DOCTOR_ENDPOINT = 'http://localhost:3000/api/v1/doctors';
  private handleErrror(error:any) {
    let message = ""
      if(error.error.message){
        message = error.error.message;
      }else message = error;
    return throwError(()=> new Error(message));
  }

  getAllDoctors():Observable<API_Response<User[]>>{
    return this._http.get<API_Response<User[]>>(this.DOCTOR_ENDPOINT)
  }
  getDoctorById(id:string):Observable<API_Response<User>>{
    return this._http.get<API_Response<User>>(this.DOCTOR_ENDPOINT+ "/"+id)
  }
  createDoctor(data: Partial<User>){
    return this._http.post(this.DOCTOR_ENDPOINT, data);
  }
  updateDoctor(id: string, changes: Partial<User>){
    return this._http.patch(this.DOCTOR_ENDPOINT+"/"+ id, changes);
  }
  deleteDoctor(id:string){
    return this._http.delete(this.DOCTOR_ENDPOINT+ "/"+id);
  }
  loginDoctor(data:Partial<User>){
    return this._http.post<API_Response<string>>(this.DOCTOR_ENDPOINT+"/login",data)
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
