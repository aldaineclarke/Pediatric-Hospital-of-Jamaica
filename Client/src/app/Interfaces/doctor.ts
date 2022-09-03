export interface Doctor{
    fname: string;
    lname: string,
    title:string,
    imageUrl: string,
    email:string,
    phone: string,
    department:string;
    username: string;
    address:{
        street: string,
        city:string,
        parish:string,
    },
    patientCount:number;
    experience: number;
    status: string;
    password: string,
    rating: number,
    isSuperAdmin: boolean;
}