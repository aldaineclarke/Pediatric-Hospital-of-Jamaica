const User = require("../schemas/user.schema");
const bcrypt = require("bcrypt")
class UsersController{

    /**
     * ### Description
     * Authenticates the user that is passed in the body of the request. 
     */
    static async loginUser(req,res, next){
        try{

        }catch(error){

        }
    }
    /**
     * ### Description
     * Gets all the users that are saved in the database.
     */
    static async getAllUsers(req, res, next){
        try{
            let users = await User.find();
            res.status(200).json({
                status: "Success",
                data:{
                    users
                }
            })
        }catch(error){
            res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    }

    /**
     * ### Description
     * Gets a single student which matches the id that was passed in the url
     */
     static async getUserById(req, res, next){
        try{
            let id = req.params.id;
            let user = await User.findById(id);
            res.status(200).json({
                status: "Success",
                data:{
                    user
                }
            })
        }catch(error){
            res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    }
    /**
     * ### Description
     * Updates the user with the data that is passed to the request in the body.
     */
     static async updateUser(req, res, next){
        try{
            let id = req.params.id;
            let user = await User.findByIdAndUpdate(id, req.body, {new:true});
            res.status(200).json({
                status: "Success",
                data:{
                    user
                }
            })
        }catch(error){
            res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    }
        /**
     * ### Description
     * Delete the user that matches the id that is passed in the url
     */
         static async deleteUser(req, res, next){
            try{
                let id = req.params.id;
                await User.findByIdAndUpdate(id);
                res.status(200).json({
                    status: "Success",
                })
            }catch(error){
                res.status(500).json({
                    status: "Failed",
                    message: error.message
                })
            }
        }
        /**
     * ### Description
     * Creates a new User from the data that is passed in the request body. 
     */
         static async createUser(req, res, next){
            try{
                let user = await new User(req.body);
                res.status(200).json({
                    status: "Success",
                    data:{
                        user
                    }
                })
            }catch(error){
                res.status(500).json({
                    status: "Failed",
                    message: error.message
                })
            }
        }
}

module.exports = UsersController;