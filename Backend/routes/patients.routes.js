const router = require("express").Router();
const patientsController = require("../controllers/patients.controller");

router.get("/",patientsController.getAllPatients())




module.exports = router