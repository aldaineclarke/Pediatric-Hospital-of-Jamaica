import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment.prod';
import { Doctor } from '../Interfaces/doctor';
import { API_Response } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _http: HttpClient) { }
  DOCTOR_ENDPOINT = `${baseUrl}/doctors`;
  private handleErrror(error:any) {
    let message = ""
      if(error.error.message){
        message = error.error.message;
      }else message = error;
    return throwError(()=> new Error(message));
  }

  DEPARTMENTS = [
    "SURGEON", "DENTISTRY", "RADIOLOGY","CARDIOLOGY", "DERMATOLOGY","OPTHALMOLOGY", "NEUROLOGY", "EMERGENCY"
  ]

  getAllDoctors():Observable<API_Response<Doctor[]>>{
    return this._http.get<API_Response<Doctor[]>>(this.DOCTOR_ENDPOINT)
  }
  getDoctorById(id:string):Observable<API_Response<Doctor>>{
    return this._http.get<API_Response<Doctor>>(this.DOCTOR_ENDPOINT+ "/"+id)
  }
  createDoctor(data: Partial<Doctor>){
    return this._http.post(this.DOCTOR_ENDPOINT, data);
  }
  updateDoctor(id: string, changes: Partial<Doctor>){
    return this._http.patch(this.DOCTOR_ENDPOINT+"/"+ id, changes);
  }
  deleteDoctor(id:string){
    return this._http.delete(this.DOCTOR_ENDPOINT+ "/"+id);
  }
  loginDoctor(data:Partial<Doctor>){
    return this._http.post<API_Response<{doctor:Doctor, token:string}>>(this.DOCTOR_ENDPOINT+"/login",data)
    .pipe(
      tap((response)=>{
        if(response.data){
          localStorage.setItem("token",response.data.token);
        }
      }),
      catchError(this.handleErrror)
    )
  }
}
