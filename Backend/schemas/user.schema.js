const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    fname: {type:String, required:true},
    lname: {type:String, required:true},
    title:{type: String},
    gender:{type: String},
    email:{type:String, unique:true, lowercase:true},
    phone: {type:String, required:true},
    role:{type:String, required:true},
    department:{type:String, required:true},
    username: {type: String, unique: true, required: true},
    password: {type:String, required:true},
    isSuperAdmin: {type:Boolean, default:false}

}, {timestamps:true});

module.exports = mongoose.model('User',userSchema);