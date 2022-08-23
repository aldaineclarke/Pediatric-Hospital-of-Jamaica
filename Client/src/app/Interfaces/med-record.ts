export interface MedRecord {
    patient: string
    doctor: string,
    complaint:string,
    diagnosis: string,
    comments: [{
        comment:string,
        date: Date
    }],
    prescription: string;
}
