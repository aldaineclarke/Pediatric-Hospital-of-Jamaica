const router = require("express").Router();
const DoctorsController = require("../controllers/doctors.controller");


router
    .route("/")
    .get(DoctorsController.getAllDoctors)
    .post(DoctorsController.createDoctor)


router
    .route("/:id")
    .get(DoctorsController.getDoctorById)
    .patch(DoctorsController.updateDoctor)
    .delete(DoctorsController.deleteDoctor)



module.exports = router;