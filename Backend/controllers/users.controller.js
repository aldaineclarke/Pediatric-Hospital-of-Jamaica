const User = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UsersController{
    /**
     * ### Description
     * Authenticates the user that is passed in the body of the request. 
     */
    static loginUser = async (req,res, next)=>{
        try{
            let email = req.body.email;
            let password = req.body.password;
            let user = await User.findOne({"email": email});
            console.log(user)
            if(user){
                let isAuthenticated = await bcrypt.compare(password,user.password)
                if(isAuthenticated){
                    let token = generateToken({_id:user._id, role: user.role})
                    return res.status(200).json({
                        status: "Success",
                        data: token,
                        message: "Login Successful"
                    })
                }
                return res.status(401).json({
                    status:"Failed",
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
                message:error
            })
        }
    }
    /**
     * ### Description
     * Gets all the users that are saved in the database.
     */
    static getAllUsers = async (req, res, next)=>{
        try{
            if(req.query.role){
                return this.getAllUsersByRole(req,res,next);
            }
            let users = await User.find();
            res.status(200).json({
                status: "Success",
                data:users
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
     static getUserById = async (req, res, next)=>{
        try{
            let id = req.params.id;

            let user = await User.findById(id);
            res.status(200).json({
                status: "Success",
                data:user
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
     static updateUser = async (req, res, next)=>{
        try{
            let id = req.params.id;
            let user = await User.findByIdAndUpdate(id, req.body, {new:true});
            res.status(200).json({
                status: "Success",
                data:user
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
         static deleteUser = async (req, res, next) =>{
            try{
                let id = req.params.id;
                await User.findByIdAndDelete(id);
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
         static createUser =  async (req, res, next)=>{
            try{

                let user = new User(req.body);
                if(!user.password){
                    user.password = (user.fname.slice(0,1)+"."+ user.lname).toUpperCase()
                }
                user.password = await bcrypt.hash(user.password, 10);
                await user.save()
                res.status(200).json({
                    status: "Success",
                    data:user
                })
            }catch(error){
                res.status(500).json({
                    status: "Failed",
                    message: error.message
                })
            }
        }

        static getAllUsersByRole = async (req,res,next) =>{
            try{
                const role = req.query.role;
                if(role){
                    let users = await User.find({"role":role})
                    return res.status(200).json({
                        status:"Success",
                        data:users
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

function generateToken(data){
    return jwt.sign(data,process.env.JWT_SECRET_KEY, {expiresIn: "60s"})
}
module.exports = UsersController;