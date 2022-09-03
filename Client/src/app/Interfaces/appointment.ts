import { Doctor } from "./doctor";

export interface Appointment {
    _id: string;
    doctor:string;
    visitStart: Date;
    fname:string;
    lname:string;
    email:string;
    notes:string;
    status: string;
    phone:string;
    userId:string;
}

// Creates an interface for Appointment with populated fields
export interface AppointmentPop extends Omit<Appointment, "doctor">{
    doctor:Partial<Doctor>;

}
