export interface Appointment {
    _id: string;
    doctor:string;
    visitStart: Date;
    visitEnd:Date;
    guardian:string;
    notes:string;
    status: string;
}
