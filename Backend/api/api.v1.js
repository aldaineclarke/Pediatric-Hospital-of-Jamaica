const router = require("express").Router();
const patientsRouter = require("../routes/patients.routes");

router.use("/patients/",patientsRouter)

module.exports = router