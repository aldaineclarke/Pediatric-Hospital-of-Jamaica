const Doctor = require("../schemas/doctor.schema");
class DoctorsController{

    /**
     *  ### Description 
     * Gets all the doctors in the database
     */
    static async getAllDoctors(req, res, next){
        try{
            let doctors = await Doctor.find();
            res.status(200).json({
                status: "Success",
                data: {
                    doctors
                }
            })
        }catch(error){
            res.status(404).json({
                status:"Failed",
                message: error.message
            })
        }
    }
    /**
     *  ### Description 
     * Gets the doctor that matches the id that is passed in the url.
     */
     static async getDoctorById(req, res, next){
        try{
            let id = req.params.id
            let doctor = await Doctor.findById(id);
            res.status(200).json({
                status: "Success",
                data: {
                    doctor
                }
            })
        }catch(error){
            res.status(404).json({
                status:"Failed",
                message: error.message
            })
        }
    }
     /**
     *  ### Description 
     * Updates the doctors information with the data that is passed in the body of the request then returns updated info.
     */
      static async updateDoctor(req, res, next){
        try{
            let id = req.params.id
            let doctor = await Doctor.findByIdAndUpdate(id, req.body, {new:true});
            res.status(200).json({
                status: "Success",
                data: {
                    doctor
                }
            })
        }catch(error){
            res.status(404).json({
                status:"Failed",
                message: error.message
            })
        }
    }
    /**
     *  ### Description 
     * Deletes a doctor who's ID matches the one that is in the database..
     */
     static async deleteDoctor(req, res, next){
        try{
            let id = req.params.id
            await Doctor.findByIdAndDelete(id);
            res.status(200).json({
                status: "Success",
            })
        }catch(error){
            res.status(404).json({
                status:"Failed",
                message: error.message
            })
        }
    }
    /**
     *  ### Description 
     * Create a doctor record using the data that is passed in the request body.
     */
     static async createDoctor(req, res, next){
        try{
            let doctor = await new Doctor().save();
            res.status(200).json({
                status: "Success",
                data:{
                    doctor
                }
            })
        }catch(error){
            res.status(404).json({
                status:"Failed",
                message: error.message
            })
        }
    }
}


module.exports = DoctorsController;