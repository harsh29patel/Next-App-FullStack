import mongoose from "mongoose";
import { type } from "os";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    isVerified:{
        default:false,
        type:Boolean
    }, 
    isAdmin:{
        default:false,
        type:Boolean
    }, 
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User = mongoose.model.users || mongoose.model("users" , userSchema)

export default User