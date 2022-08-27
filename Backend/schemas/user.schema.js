const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    fname: {type:String, required:true},
    lname: {type:String, required:true},
    title:{type: String},
    gender:{type: String},
    imageUrl: {type: String},
    email:{type:String, unique:true, lowercase:true},
    phone: {type:String, required:true},
    role:{type:String, required:true, default:"Customer"},
    department:{type:String, required:true, default: "Customer"},
    username: {type: String, unique: true, required: true},
    Address:[{
        street: {type: String},
        city:{type: String},
        parish:{type: String},
    }],
    password: {type:String, required:true},
    isSuperAdmin: {type:Boolean, default:false}

}, {timestamps:true});

module.exports = mongoose.model('User',userSchema);