const router = require("express").Router();
const patientsRouter = require("../routes/patients.routes");
const usersRouter = require("../routes/users.routes");
const recordsRouter = require("../routes/medrec.routes");
const doctorsRouter = require("../routes/doctors.routes");
router.use("/patients/",patientsRouter);
router.use("/users/", usersRouter)
// router.use("/departments/", departmentsRouter)
router.use("/records/", recordsRouter)

module.exports = router