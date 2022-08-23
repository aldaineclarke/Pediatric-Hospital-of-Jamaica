const Appointment = require("../schemas/appointment.schema");
const {ObjectId} = require("mongoose").Types;

class AppointmentController{

        /**
     * ### Description
     * Gets all the Appointment from the database
     * 
     */
    static async getAllAppointments(req, res, next){
        try{
            let appointments = await Appointment.find();
            res.status(200).json(appointments); 
        }catch(error){
            res.status(500).json({message: "Server has encountered an error"})
        }
    }
    /**
     * ### Description
     * Gets a singles appointment from the database where it matches the id that is found in the request parameters
     * 
     */
    static async getSingleAppointment(req, res, next){
        try{
            let id = parseInt(req.params.id);
            let appointment = await Appointment.findById(id);
            if(appointment){
                return res.status(200).send(appointment);
            }
            return res.status(400).json({message: "No user exist with that information"})
        }catch(error){
            res.status(500).json({message: "Server has encountered an error"})
        }
    }
        /**
     * ### Description
     * Creates a single appointment with the data that is submitted in the request body
     */
    static async createAppointment(req, res, next){
        try{
            let newAppointment = await new Appointment(req.body).save();
            res.status(201).json(newAppointment);
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }
        /**
     * ### Description
     * Updates the Appointment with the data that is passed in the request body, and identifies the patient by the id passed in the request parameters
     */
    static async updatePatient(req,res, next){
        try{
           let id = parseInt(req.params.id);
           if(Object.keys(req.body).length == 0){
            return res.json({message: "There is no data passed to update the patient "})
           }else{
                let appointment = await Appointment.findByIdAndUpdate(id,req.body)
                res.status(200).json(appointment)
            }
        }catch(error){
            res.status(404).json({message: "Unable to find an appointment"})
        }


    }
    /**
     * ### Description
     * Deletes the Appointment that matches the id that is passed in the request url.
     */
    static async deletePatient(req,res, next){
        try{
            let id = parseInt(req.params.id);
            await Appointment.findByIdAndDelete(id);
            res.status(200).json({message: "Appointment deleted"})
        }catch(error){
            res.status(500).json({message: "Unable to delete user"})
        }
    }
}
module.exports = AppointmentController;