const router = require("express").Router();
const patientsController = require("../controllers/patients.controller");


router.param(":id", (req,res, next,id)=>{
    console.log(id);
    next();
});


router
    .route("/")
    .get(patientsController.getAllPatients)
    .post(patientsController.createPatient);
    
router
    .route("/:id")
    .get(patientsController.getSinglePatient)
    .patch(patientsController.updatePatient)
    .put(patientsController.updatePatient)
    .delete(patientsController.deletePatient)





module.exports = router