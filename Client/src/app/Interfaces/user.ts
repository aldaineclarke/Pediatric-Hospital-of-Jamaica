export interface User {
    _id: string;
    fname: string;
    lname: string;
    email:string;
    phone: string;
    imageUrl: string;
    username: string;
    password: string;
    address:{
        street: string,
        city:string,
        parish:string,
    }
}

export interface API_Response<T>{
    status: string;
    data: T;
    message?:string;
}
