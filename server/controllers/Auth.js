const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const mailSender = require('../utils/mailSender');
const {otpSignupMailTemplate, deleteAccountMailTemplate, accountRegisteredMailTemplate} = require('../utils/mailTemplates');

//OTP creation for an email
exports.sendOTP = async (req, res)=>{
    try{
        const {email} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User already exists"
            });
        }

        let isUniqueOTPFound = false;
        let otp = "";
        while(!isUniqueOTPFound){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            let existingOTP = await OTP.findOne({otp});
            if(!existingOTP){
                isUniqueOTPFound = true;
            }
        }

        await OTP.create({email, otp});
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully",
        }); 
    }catch(e){
        console.log("Error occurred while sending OTP ", e);
        res.status(500).json({
            success:false,
            message:"Error while sending OTP"
        })
    }
}

//signup
exports.signup = async (req, res)=>{
    try{
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(400).json({
                success: false,
                message:"All fields are required",
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success: false,
                message:"User already exists"
            });
        }

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password did not match",
            });
        }

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if(recentOtp.length == 0){
            return res.status(404).json({
                success: false,
                message:"OTP not found"
            });
        }

        if(recentOtp[0].otp != otp){
            console.log(recentOtp.otp);
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({gender:null, dateOfBirth:null, about:null, contactNumber:contactNumber});

        const user = await User.create({firstName, lastName, email, password:hashedPassword, accountType, additionalDetails:profileDetails._id, courses:[], image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, courseProgress:[]})

        await mailSender(email, "Account Created Successfully", accountRegisteredMailTemplate(firstName))

        return res.status(200).json({
            success:true,
            messsage:"User is registered successfully",
            user
        });
    }catch(e){
        console.log("Error occured while sign up : ",e);
        return res.status(500).json({
            success: false,
            message:e.message
        });
    }
}

//login
exports.login = async (req, res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(404).json({
                success: true,
                message: "User not found",
            });
        }

        let isPasswordMatched = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordMatched){
            return res.status(400).json({
                success:false,
                message: "Incorrect Password"
            });
        }

        const payload = {
            email: existingUser.email,
            id: existingUser._id,
            accountType: existingUser.accountType
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn:"2h",
        });
        existingUser.token = token;
        existingUser.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true,
            secure: true,
            sameSite: 'Lax'
        }
        res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user:existingUser,
        })
    }catch(e){
        console.log("Error occurred in login ", e);
        return res.status(500).json({
            success: false,
            message:"Error in login",
        });
    }
}

//changePassword
exports.changePassword = async (req, res)=>{
    try{
        const {email, password, newPassword}  = req.body;
        if(!email || !password || !newPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        });
    } catch(e){
        console.log("Error occurred in login ", e);
        return res.status(500).json({
            success: false,
            message:"Error in login",
        });
    }
}