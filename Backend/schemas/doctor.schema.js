const { Schema, model } = require("mongoose");


let doctorSchema = new Schema({
    fname: {type:String},
    lname: {type:String},
    title:{type: String},
    email: {type:String},
    gender:{type: String},
    email:{type:String},
    phone: {type:String},
    specialty:{type:String},
    // Address:[{
    //     street: {type: String},
    //     city:{type: String},
    //     parish:{type: String},
    // }]
})


module.exports = model("Doctor", doctorSchema);