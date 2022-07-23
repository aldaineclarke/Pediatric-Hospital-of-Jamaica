const { Schema, model } = require("mongoose");

let medRecord = new Schema({
    patient: {type: Schema.Types.ObjectId, ref:"patient"},
    doctor: {type:Schema.Types.ObjectId, ref:"doctor"},
    complaint:{type: String},
    diagnosis: {type: String},
    comments: [{
        comment:{type: String},
        date: {type: Date, default: ()=> new Date()}
    }],
    prescription: {type:String}

}, {timeseries: true})


module.exports = model("medRecord", medRecord);