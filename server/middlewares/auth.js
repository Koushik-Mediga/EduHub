const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../models/User');

//auth
exports.auth = async (req, res, next)=>{
    try{
        const token = req.header("Authorization").replace("Bearer ", "") || req.cookies?.token || req.body?.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message: "Token is missing"
            });
        }

        try{
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            });
        }
        next();
    }catch(e){
        return res.status(401).json({
            success: false,
            message:e.message,
        });
    }
}

//isStudent
exports.isStudent = async (req, res, next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Students only",
            });
        }
        next();
    }catch(e){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
}

//isInstructor
exports.isInstructor = async (req, res, next)=>{
    try{
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor only",
            });
        }
        next();
    }catch(e){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
}

//isAdmin
exports.isAdmin = async (req, res, next)=>{
    try{
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin only",
            });
        }
        next();
    }catch(e){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
}