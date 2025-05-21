const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');

//sending resestPassword mail
exports.resetPasswordToken = async (req, res)=>{
    try{
        const email = req.body.email;
        const existingUser = await User.findOne({email: email});
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"Your email is not registered"
            })
        }

        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({email}, {resetPasswordToken:token, resetPasswordExpires:Date.now()+5*60*100},{new:true});
        
        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email, "Password Reset Link", `Password Reset Link : ${url}`);

        return res.json({
            success: true,
            message:"Email sent Successfully, please check email and change password"
        });
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"Error occurred while sending reset password mail"
        });
    }
}

//Reset Password
exports.resetPassword = async (req, res)=>{
    try{
        const {password, confirmPassword, token} = req.body;

        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Password not matching",
            });
        }
        const userDetails = await User.findOne({resetPasswordToken: token});
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid",
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({resetPasswordToken:token}, {password:hashedPassword}, {new:true});

        return res.status(200).json({
            success:true,
            message:"Password reset successful",
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending reset pwd mail"
        })
    }   
}