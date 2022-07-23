require("dotenv").config();
const express = require('express');
const { default: mongoose } = require("mongoose");
const app = express();







const PORT = parseInt(process.env.PORT);




// Server Start and Connect to DB
app.listen(PORT, (error)=>{
    if(error){
        throw error;
    }
    mongoose.connect(process.env.DB_URI,{},(error)=>{
        if(error){
            console.log(error.message);
            throw error.message;
        }
        console.log("Server is Connected with Database");

        
    });
})






