export interface Patient{
    _id:string;
    fname: string;
    lname: string;
    mname:string;
    email: string;
    DOB: Date;
    patientImage: string;
    guardian_fname:string;
    guardian_lname:string;
    guardian_address:[{
        street: string,
        city:string,
        parish: string
    }];
    phone: string;
    gender:string;
    allergies: string;
    nationality:string;
    admission_date:Date;
    admit_doctor: string;
}