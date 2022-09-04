import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, AppointmentPop } from '../Interfaces/appointment';
import { API_Response } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private _http:HttpClient) { }
  APPOINTMENT_ENDPOINT = 'https://phj-app.herokuapp.com/api/v1/appointments';

  getAllAppointments():Observable<API_Response<Appointment[]>>{
    return this._http.get<API_Response<Appointment[]>>(this.APPOINTMENT_ENDPOINT);
  }

  getAppointmentById(id:string):Observable<API_Response<Appointment>>{
    return this._http.get<API_Response<Appointment>>(this.APPOINTMENT_ENDPOINT+"/"+id);
  }
  getUserAppointments(id:string):Observable<API_Response<AppointmentPop[]>>{
    return this._http.get<API_Response<AppointmentPop[]>>(this.APPOINTMENT_ENDPOINT+ "?userId="+ id);
  }
  createAppointment(data:Partial<Appointment>):Observable<API_Response<Appointment>>{
    return this._http.post<API_Response<Appointment>>(this.APPOINTMENT_ENDPOINT,data);
  }
  updateAppointment(id:string, data:Partial<Appointment>):Observable<API_Response<Appointment>>{
    return this._http.patch<API_Response<Appointment>>(this.APPOINTMENT_ENDPOINT+"/"+id, data);
  }
  deleteAppointment(id:string){
    return this._http.delete(this.APPOINTMENT_ENDPOINT+"/"+id);
  }
}
