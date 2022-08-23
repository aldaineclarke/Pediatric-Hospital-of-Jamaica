const { Schema, model } = require("mongoose");


let appointmentSchema = new Schema({
    fname: {type:String, required:true},
    lname: {type:String, required:true},
    email: {type:String, required:true},
    doctor:{type: Schema.Types.ObjectId, ref:"User"},
    visitTime: {type:Date, required: true},
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

module.exports = model("Appointment", appointmentSchema);