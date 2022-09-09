import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment.prod';
import { Patient } from '../Interfaces/patient';
import { API_Response } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private  PATIENT_ENDPOINT = `${baseUrl}/patients`;
  constructor(private _http:HttpClient) { }

  createPatient(data:Partial<Patient>):Observable<API_Response<Patient>> {
    return this._http.post<API_Response<Patient>>(this.PATIENT_ENDPOINT, data);
  }

  getPatientById(id:string):Observable<API_Response<Patient>>{
    return this._http.get<API_Response<Patient>>(this.PATIENT_ENDPOINT+ "/"+id);
  }
  updatePatient(id:string, data:Partial<Patient>){
    return this._http.patch(this.PATIENT_ENDPOINT+ "/"+ id, data);
  }
  deletePatient(id:string){
    return this._http.delete(this.PATIENT_ENDPOINT+ "/"+ id);
  }
  getAllPatients():Observable<API_Response<Patient[]>>{
    return this._http.get<API_Response<Patient[]>>(this.PATIENT_ENDPOINT);
  }
}
