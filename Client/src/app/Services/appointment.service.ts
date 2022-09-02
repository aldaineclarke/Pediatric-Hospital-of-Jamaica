import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../Interfaces/appointment';
import { API_Response } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private _http:HttpClient) { }
  APPOINTMENT_ENDPOINT = 'http://localhost:3000/api/v1/appointments';

  getAllAppointments():Observable<API_Response<Appointment[]>>{
    return this._http.get<API_Response<Appointment[]>>(this.APPOINTMENT_ENDPOINT);
  }

  getAppointmentById(id:string):Observable<API_Response<Appointment>>{
    return this._http.get<API_Response<Appointment>>(this.APPOINTMENT_ENDPOINT+"/"+id);
  }
  getUserAppointments(email:string):Observable<API_Response<Appointment[]>>{
    return this._http.get<API_Response<Appointment[]>>(this.APPOINTMENT_ENDPOINT+ "?email="+ email);
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
