const router = require("express").Router();
const UsersController = require("../controllers/users.controller");


router
    .route("/")
    .get(UsersController.getAllUsers)
    .post(UsersController.createUser)

router
    .route("/:id")
    .get(UsersController.getUserById)
    .patch(UsersController.updateUser)
    .delete(UsersController.deleteUser)



module.exports = router;