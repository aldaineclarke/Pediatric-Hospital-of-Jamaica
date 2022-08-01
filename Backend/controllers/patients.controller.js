const Patient = require("../schemas/patient.schema");
const {ObjectId} = require("mongoose").Types;

class PatientsController{

        /**
     * ### Description
     * Gets all the patients from the database
     * 
     */
    async getAllPatients(req, res, next){
        try{
            let patients = await Patient.find();
            res.status(200).json(patients); 
        }catch(error){
            res.status(500).json({message: "Server has encountered an error"})
        }
    }
    /**
     * ### Description
     * Gets a singles patient from the database where it matches the id that is found in the request parameters
     * 
     */
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
        /**
     * ### Description
     * Creates a single patient with the data that is submitted in the request body
     */
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
        /**
     * ### Description
     * Updates the patient with the data that is passed in the request body, and identifies the patient by the id passed in the request parameters
     */
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
    /**
     * ### Description
     * Deletes the patient that matches the id that is passed in the request url.
     */
    async deletePatient(req,res, next){
        try{
            let id = parseInt(req.params.id);
            await Patient.findByIdAndDelete(id);
            res.status(200).json({message: "Patient deleted"})
        }catch(error){
            res.status(500).json({message: "Unable to delete user"})
        }
    }
}
module.exports = new PatientsController();