require("dotenv").config();
const express = require('express');
const { default: mongoose } = require("mongoose");
const patientRouter = require("../Backend/routes/patients.routes")
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use("/api/patients", patientRouter)






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






