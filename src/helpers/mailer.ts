import User from '@/models/user.model';
import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs"





export const sendEmail = async({email , emailType , userId}:any)=>{
    try {

      const hashedToken = await bcryptjs.hash(userId.toString(), 10)


        if(emailType==="VERIFY"){
          await User.findByIdAndUpdate(userId,
            {verifyToken: hashedToken , verifyTokenExpiry:Date.now()+3600000})
        } else if(emailType==="RESET"){
          await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken , forgotPasswordExpiry:Date.now()+3600000})
        }
        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "24b33fe9f57775", // ❌
            pass: "15a5b8480179f7"  // ❌
          }
        });

        const forgot={
          html:`<p>Click <a href="${process.env.DOMAIN}/forgotpassword>?token=${hashedToken}">here</a> to ${emailType==="VERIFY"?"Verify your email":"Reset your email"}
          or copy and paste the link below in your browser\
          <br> ${process.env.DOMAIN}/forgotpassword?token=${hashedToken}
          </p>`
        }


          const mailOptions={
            from: 'harsh@money.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ?"Verify your email" :  "Resest your password",
         
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail>?token=${hashedToken}">here</a> to ${emailType==="VERIFY"?"Verify your email":"Reset your email"}
            or copy and paste the link below in your browser\
            <br> ${process.env.DOMAIN}/veirfyemail?token=${hashedToken}
            </p>`,
            forgot
          }

           const mailResponse = await transport.sendMail(mailOptions)
                return mailResponse 
    } 
          catch (error:any) {
         throw new Error(error.message)
    }
}

