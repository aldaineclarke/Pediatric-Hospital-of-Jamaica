const { isValidObjectId } = require("mongoose");
const Appointment = require("../schemas/appointment.schema");
const {ObjectId} = require("mongoose").Types;
const {jsonResponse} = require("../utilities/jsonResponse");
class AppointmentController{

        /**
     * ### Description
     * Gets all the Appointment from the database
     * 
     */
    static async getAllAppointments(req, res, next){
        try{
            let appointments = await Appointment.find();
            jsonResponse(res, 200, "Success", "Successfully Retrieved", appointments);
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message)
        }
    }
    /**
     * ### Description
     * Gets a singles appointment from the database where it matches the id that is found in the request parameters
     * 
     */
    static async getSingleAppointment(req, res, next){
        try{
            let id = req.params.id;
            let appointment = await Appointment.findById(id);
            if(appointment){
                jsonResponse(res, 200, "Success", "Successfully Retrieved", appointment);
            }
            return jsonResponse(res, 400, "Failed","No user exist with that information");
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message)
        }
    }
        /**
     * ### Description
     * Creates a single appointment with the data that is submitted in the request body
     */
    static async createAppointment(req, res, next){
        try{
            let newAppointment = await new Appointment(req.body).save();
            jsonResponse(res, 200, "Success", "Successfully Created Appointment", newAppointment);
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message)
        }
    }
        /**
     * ### Description
     * Updates the Appointment with the data that is passed in the request body, and identifies the patient by the id passed in the request parameters
     */
    static async updateAppointment(req,res, next){
        try{
           let id = req.params.id;
           if(Object.keys(req.body).length == 0){
            return res.json({message: "There is no data passed to update the patient "})
           }else{
                let appointment = await Appointment.findByIdAndUpdate(id,req.body)
                jsonResponse(res, 200, "Success", "Successfully Updated", appointment);
            }
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message)
        }


    }
    /**
     * ### Description
     * Deletes the Appointment that matches the id that is passed in the request url.
     */
    static async deleteAppointment(req,res, next){
        try{
            let id = req.params.id;
            let count = await Appointment.findByIdAndDelete(id);
            jsonResponse(res, 200, "Success", "Successfully Deleted");
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message)
        }
    }
}
module.exports = AppointmentController;