const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config();

exports.createSubSection = async (req, res)=>{
    try {
        const {title, timeDuration, description, sectionId, courseId} = req.body;
        const videoString = req.files.file;
        if(!courseId || !sectionId || !title || !timeDuration || !description || !videoString){
            return res.status(404).json({
                success:false,
                message:"All fields are required",
            });
        }
        const uploadDetails = await uploadImageToCloudinary(videoString, process.env.FOLDER_NAME);
        if(!uploadDetails){
            return res.status(400).json({
                success:false,
                message:"Error occured while uploading image",
            });
        }
        console.log(uploadDetails);

        const newSubSection = await SubSection.create({title, timeDuration, description, videoUrl:uploadDetails.secure_url});

        const updatedSectionDetails = await Section.findOneAndUpdate({_id:sectionId}, {$push: {subSection:newSubSection._id}}, {new:true}).populate("subSection").exec();
        
        const course = await Course.findOne({_id:courseId}).populate({ path: "instructor", populate: { path: "additionalDetails" } })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: { path: "subSection" },
        });

        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            section: updatedSectionDetails,
            course,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.updateSubSection = async (req, res)=>{
    try {
        const {title, timeDuration, description, subSectionId, courseId} = req.body;
        let videoString = null;
        if(req.files){
            videoString = req.files?.file;
        }else{
            videoString = null;
        }

        if((!subSectionId || !courseId)|| (!title && !timeDuration && !description && !videoString)){
            return res.status(404).json({
                success:false,
                message:"Atleast one field should be filled",
            });
        }

        //Add a check that instructor of this course is same as the user who is doing the updation

        const updatePayload = {};
        if(title){
            updatePayload.title = title;
        }
        if(timeDuration){
            updatePayload.timeDuration = timeDuration;
        }
        if(description){
            updatePayload.description = description;
        }
        if(videoString){
            const videoUploadDetails = await uploadImageToCloudinary(videoString, process.env.FOLDER_NAME);
            if(!videoUploadDetails){
                return res.status(400).json({
                success:false,
                message:"Error occured while uploading image",
                });
            }
            updatePayload.videoUrl = videoUploadDetails.secure_url;
        }

        const updatedSubSectionDetails = await SubSection.findOneAndUpdate({_id:subSectionId}, updatePayload, {new:true});
        
        const course = await Course.findOne({_id:courseId}).populate({ path: "instructor", populate: { path: "additionalDetails" } })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: { path: "subSection" },
        });
        
        return res.status(200).json({
            success:true,
            message:"Updated subsection details successfully",
            subSection: updatedSubSectionDetails,
            course,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.deleteSubSection = async (req, res)=>{
    try {
        const {subSectionId, sectionId, courseId} = req.body;

        if(!subSectionId || !sectionId || !courseId){
            return res.status(404).json({
                success:false,
                message:"Invalid Data",
            });
        }

        await SubSection.findOneAndDelete({_id:subSectionId});

        await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { subSections: subSectionId } },
            { new: true }
        );

        const course = await Course.findOne({_id:courseId}).populate({ path: "instructor", populate: { path: "additionalDetails" } })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: { path: "subSection" },
        });

        return res.status(200).json({
            success:true,
            message:"Deleted subsection successfully",
            course,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}