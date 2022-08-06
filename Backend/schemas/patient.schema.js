const { Schema, model } = require("mongoose");


let patientSchema = new Schema({
    fname: {type:String},
    lname: {type:String},
    email: {type:String},
    DOB: {type:Date},
    guardianName:{type:String},
    gender:{type: String},
    phone: {type:String},
    Address:[{
        street: {type: String},
        city:{type: String},
        parish:{type: String},
    }]
}, {timestamps:true});
// Will create timestamps for the createdAt and updatedAt time;

module.exports = model("Patient", patientSchema);