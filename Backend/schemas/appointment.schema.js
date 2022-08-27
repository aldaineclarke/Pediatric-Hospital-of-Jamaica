const { Schema, model } = require("mongoose");


let appointmentSchema = new Schema({
    doctor:{type: Schema.Types.ObjectId, ref:"User"},
    visitStart: {type:String, required: true},
    visitEnd:{type:Date,required:true},
    guardian:{type:String},
    notes:{type:String},
    status: {type:Boolean, default:false},
}, {timestamps:true});
// Will create timestamps for the createdAt and updatedAt time;

module.exports = model("Appointment", appointmentSchema);