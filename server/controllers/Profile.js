const Course = require('../models/Course');
const Profile = require('../models/Profile');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config();

exports.updateProfile = async (req, res)=>{
    try {
        const {gender, dateOfBirth, about, contactNumber} = req.body;
        const userId = req.user.id;
        const updatePayLoad = {};
        if(gender){
            updatePayLoad.gender = gender;
        }
        if(dateOfBirth){
            updatePayLoad.dateOfBirth = dateOfBirth;
        }
        if(about){
            updatePayLoad.about = about;
        }
        if(contactNumber){
            updatePayLoad.contactNumber = contactNumber;
        }
        const existingUser = await User.findOne({_id:userId});
        if(!existingUser){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        const updatedProfileDetails = await Profile.findOneAndUpdate({_id:existingUser.additionalDetails},updatePayLoad, {new:true});
        return res.status(200).json({
                success:true,
                message:"Profile details updated successfully",
                updatedProfileDetails,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Unable to update profile, something went wrong on our side",
        });
    }
}

//delete Account
exports.deleteAccount = async (req, res)=>{
   try {
        const userId = req.user.id;
        const userDetails = await User.findOne({_id:userId});
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        const profileId = userDetails.additionalDetails;
        const updatedProfileDetails = await Profile.findByIdAndDelete(profileId);
        const enrolledCourses = userDetails.courses;
        for (const courseId of enrolledCourses) {
            await Course.findByIdAndUpdate(courseId, {$pull: {studentsEnrolled:userId}});
        }
        const email = userDetails.email;
        const userName = userDetails.firstName;
        const updatedUserDetails = await User.findByIdAndDelete(userId);
        await mailSender(email, "Account Deleted successfully", `<h1>Hello ${userName},</h1><br/><p>Your account is permanently deleted from StudyLearn.</p>`)
        return res.status(200).json({
            success:true,
            message:"Account deleted successfully",
        });

   } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
   } 
}

exports.updateDisplayPicture = async (req, res)=>{
    try {
        const userId = req.user.id;
        const pp = req.files.file;
        if(!pp){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const profilePicture = await uploadImageToCloudinary(pp, process.env.FOLDER_NAME);
        if(!profilePicture){
            return res.status(401).json({
                success:false,
                message:"Could not upload image to cloudinary"
            });
        }
        const updatedUserDetails = await User.findOneAndUpdate({_id:userId}, {image:profilePicture.secure_url}, {new:true});
        if(!updatedUserDetails){
            return res.status(404).json({
                success:false,
                message:"Could not find user with the given id",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Updated the profile picture of the user",
            updatedUserDetails
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getUserDetails = async (req, res)=>{
    try {
        console.log(req.user);
        const userId = req.user.id;
        const user = await User.findOne({_id:userId}).populate("additionalDetails");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            user
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}