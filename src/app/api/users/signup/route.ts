import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/user.model"
import { error, log } from "console"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs, { hash } from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"
import { send } from "process"

connect()

export async function POST (request:NextRequest) {               // method can be any GET,POST,PATCH,DELETE etc
    try {
         const reqBody =  await request.json()
         const{username , email , password} = reqBody
        //validation
        console.log(reqBody);

            // To see if user already exitsts or not

         const user = await User.findOne({email})
         if(user){
            return NextResponse.json({error:"user already exists"},{status:400})
         }
            //Password hashing
         const salt = await  bcryptjs.genSalt(10)  //from bcrypt github documentary
         const hashedPassword = await bcryptjs.hash(password,salt)


        const newUser =  new User({
            username,
            email,
            password:hashedPassword
         })

         const savedUser =  await newUser.save()
         console.log(savedUser);

         //send verification email

         await sendEmail({email , emailType:"VERIFY" , userId:savedUser._id})
         return NextResponse.json({
            message:"User registered Successfully",
            success:true,
            savedUser
         })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }   
}