export interface User {
    _id: string;
    fname: string;
    lname: string;
    title:string;
    gender:string;
    email:string;
    phone: string;
    role:string;
    imageUrl: string;
    department:string;
    username: string;
    password: string;
    isSuperAdmin: boolean;
    address:[{
        street: string,
        city:string,
        parish:string,
    }]
}

export interface API_Response<T>{
    status: string;
    data: T;
    message?:string;
}
