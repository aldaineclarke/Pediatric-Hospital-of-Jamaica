const User = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jsonResponse} = require("../utilities/jsonResponse");
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
                    let token = generateToken({_id:user._id,username:user.username, role: user.role})
                    return jsonResponse(res,200,"Success","Successfully Logged in",token);
                }
                return jsonResponse(res,401,"Failed","Credentials are Incorrect");
            }
            return jsonResponse(res,401,"Failed","User not Found");
        }catch(error){
            jsonResponse(res, 400,"Failed", error.message);
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

            return jsonResponse(res,200, "Success", "Successfully retrieved", users)

        }catch(error){
            return jsonResponse(res, 400, "Failed", error.message);
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
            return jsonResponse(res, 200,"Success", "Successfully retrieved", user)
        }catch(error){
            jsonResponse(res, 500, "Failed", error.message)
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
            jsonResponse(res, 200,"Success", "Successfully updated", user)
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message);
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
                jsonResponse(res,200, "Success", "Successfully Deleted")
            }catch(error){
                jsonResponse(res, 400, "Failed", error.message)
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
                return jsonResponse(res, 200, "Success", "Successfully Logged in")
            }catch(error){
                jsonResponse(res, 400, "Failed", error.message);
            }
        }

        static getAllUsersByRole = async (req,res,next) =>{
            try{
                const role = req.query.role;
                if(role){
                    let users = await User.find({"role":role})
                    return jsonResponse(res, 200, "Success", "Successfully Retrieved", users)
                }
            }catch(error){
                jsonResponse(res, 400, "Failed", error.message);
            }
        }
}

function generateToken(data){
    return jwt.sign(data,process.env.JWT_SECRET_KEY, {expiresIn: "3600s"})
}
module.exports = UsersController;