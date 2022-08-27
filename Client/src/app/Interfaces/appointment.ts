export interface Appointment {
    _id: string;
    doctor:string;
    visitStart: Date;
    guardian:string;
    notes:string;
    status: string;
}
