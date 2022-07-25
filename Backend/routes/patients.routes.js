const router = require("express").Router();
const patientsController = require("../controllers/patients.controller");

router.get("/",patientsController.getAllPatients)
router.get("/:id",patientsController.getSinglePatient)




module.exports = router