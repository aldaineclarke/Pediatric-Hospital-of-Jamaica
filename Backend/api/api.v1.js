const router = require("express").Router();
const patientsRouter = require("../routes/patients.routes");
const appointmentsRouter = require("../routes/appointments.routes");
const usersRouter = require("../routes/users.routes");
const recordsRouter = require("../routes/medrec.routes");

router.use("/patients/",patientsRouter);
router.use("/users/", usersRouter);
router.use("/records/", recordsRouter);
router.use("/appointments/", appointmentsRouter)

module.exports = router