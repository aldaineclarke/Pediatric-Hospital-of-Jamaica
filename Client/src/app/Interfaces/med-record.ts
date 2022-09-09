export interface MedRecord {
    patient: string
    complaint:string,
    diagnosis: string,
    comments: [{
        comment:string,
        date: Date
    }],
    prescription: string;
}
