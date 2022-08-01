const router = require("express").Router();
const patientsRouter = require("../routes/patients.routes");

router.use("/patients/",patientsRouter);
router.use("/users/", usersRouter)
router.use("/departments/", departmentsRouter)
router.use("/records/", recordsRouter)
router.use("/doctors/", doctorsRouter)

module.exports = router