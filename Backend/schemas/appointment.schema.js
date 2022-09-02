const { Schema, model } = require("mongoose");


let appointmentSchema = new Schema({
    doctor:{type: Schema.Types.ObjectId, ref:"User"},
    visitStart: {type:Date, required: true},
    guardian:{type:String},
    notes:{type:String},
    fname: {type:String},
    lname: {type:String},
    title: {type:String},
    email: {type:String},
    gender: {type:String},
    phone:{type:Schema.Types.ObjectId},
    userId: {type: String},
    status: {type:Boolean, default:false},
}, {timestamps:true});
// Will create timestamps for the createdAt and updatedAt time;

appointmentSchema.post('find', async function(documents){
    for(let doc of documents){
        await doc.populate('doctor',{createdAt: 0, password: 0, updatedAt: 0, isSuperAdmin:0});
    }
});
module.exports = model("Appointment", appointmentSchema);