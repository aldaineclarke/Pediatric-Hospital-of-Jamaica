const Patient = require("../schemas/patient.schema");
const {ObjectId} = require("mongoose").Types;

class PatientsController{

    async getAllPatients(req, res, next){
        try{
            let patients = await Patient.find();
            res.status(200).json(patients); 
        }catch(error){
            res.status(500).json({message: "Server has encountered an error"})
        }
    }
    getSing

}

module.exports = new PatientsController();