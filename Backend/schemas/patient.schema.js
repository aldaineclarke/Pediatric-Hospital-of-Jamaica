const { Schema, model } = require("mongoose");


let patientSchema = new Schema({
    fname: {type:String},
    lname: {type:String},
    mname:{type:String},
    email: {type:String},
    DOB: {type:Date},
    patientImage: {type:String},
    guardianName:{type: Schema.Types.ObjectId, ref: "User"},
    gender:{type: String},
    allergies: {type:String},
    nationality:{type:String},

}, {timestamps:true});
// Will create timestamps for the createdAt and updatedAt time;

module.exports = model("Patient", patientSchema);