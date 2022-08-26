require("dotenv").config();
const express = require('express');
const { default: mongoose } = require("mongoose");
const apiRouter = require("../Backend/api/api.v1");
const app = express();
const cors = require("cors");
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors());
app.use("/api/v1/", apiRouter);






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






