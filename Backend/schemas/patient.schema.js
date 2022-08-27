const { Schema, model } = require("mongoose");


let patientSchema = new Schema({
    fname: {type:String},
    lname: {type:String},
    mname:{type:String},
    email: {type:String},
    DOB: {type:Date},
    patientImage: {type:string},
    guardianName:{type: Schema.Types.ObjectId, ref: "User"},
    gender:{type: String},
    allergies: string,
    nationality:string,

}, {timestamps:true});
// Will create timestamps for the createdAt and updatedAt time;

module.exports = model("Patient", patientSchema);