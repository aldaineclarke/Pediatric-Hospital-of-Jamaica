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
    async getSinglePatient(req, res, next){
        try{
            let id = parseInt(req.params.id);
            let patient = await Patient.findById(id);
            if(patient){
                return res.status(200).send(patient);
            }
            return res.status(400).json({message: "No user exist with that information"})
        }catch(error){
            res.status(500).json({message: "Server has encountered an error"})
        }
    }

    async createPatient(req, res, next){
        try{
            let data = {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                DOB: req.body.DOB,
                guardianName:req.body.guardianName,
                gender:req.body.gender,
                phone: req.body.phone,
                Address:[{
                    street: req.body.street,
                    city:req.body.city,
                    parish:req.body.parish,
                }]
            }
            let newPatient = await new Patient(data).save();
            res.status(201).json(newPatient);
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }
    async updatePatient(req,res, next){
        try{
           let id = parseInt(req.params.id);
           if(Object.keys(req.body).length == 0){
            return res.json({message: "There is no data passed to update the patient "})
           }else{
                let patient = await Patient.findByIdAndUpdate(id,req.body)
                res.status(200).json(patient)
        }
    }catch(error){
        res.status(404).json({message: "Unable to find patient"})
    }


}
}
module.exports = new PatientsController();