const { Schema, model } = require("mongoose");


let appointmentSchema = new Schema({
    doctor:{type: Schema.Types.ObjectId, ref:"User"},
    visitTime: {type:Date, required: true},
    guardianName:{type:String},
    notes:{type:String},
}, {timestamps:true});
// Will create timestamps for the createdAt and updatedAt time;

module.exports = model("Appointment", appointmentSchema);