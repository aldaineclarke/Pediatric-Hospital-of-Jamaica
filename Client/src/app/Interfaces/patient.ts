export interface Patient{
    _id:string;
    fname: string;
    lname: string;
    mname:string;
    email: string;
    DOB: Date;
    patientImage: string;
    guardian:string;
    gender:string;
    allergies: string;
    nationality:string;
    admission_date:Date;
    admit_doctor: string;
}