const User = require("../schemas/user.schema");
const bcrypt = require("bcrypt")
class UsersController{

    /**
     * ### Description
     * Authenticates the user that is passed in the body of the request. 
     */
    static async loginUser(req,res, next){
        try{
            let username = req.body.username;
            let user = await User.findOne({"username": username});
            if(user){
                if(await bcrypt.compare(password, user.password)){
                    return res.status(200).json({
                        status: "Success",
                        data:{
                            user
                        },
                        message: "Login Successful"
                    })
                }
                return res.status(401).json({
                    status:"Success",
                    message:"Credential incorrect."
                })

            }
            res.status(401).json({
                status: "Failed",
                message: "User is not found in the database"
            })
        }catch(error){
            res.status(400).json({
                status:"Failed",
                message:"Internal Error"
            })
        }
    }
    /**
     * ### Description
     * Gets all the users that are saved in the database.
     */
    static async getAllUsers(req, res, next){
        try{
            if(req.query.role){
                return this.getAllUsersByRole(req,res,next);
            }
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
        static async getAllUsersByRole(req,res,next){
            try{
                let role = req.query.role;
                if(role){
                    let users = await User.find({"role":role})
                    return res.status(200).json({
                        status:"Success",
                        data:{
                            users
                        }
                    })
                }
            }catch(error){
                res.status(400).json({
                    status:"Failed",
                    message:error.message
                })
            }
        }
}

module.exports = UsersController;