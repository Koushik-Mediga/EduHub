const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');

exports.createSection = async (req, res)=>{
    try {
        const {sectionName, courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(404).json({
                success:false,
                message:"All fields are required",
            });
        }

        const courseDetails = await Course.findOne({_id:courseId});
        const instructorId = courseDetails.instructor;
        const userId = req.user.id;
        console.log("Instructor id: ", instructorId, " userId : ", userId);
        if(!instructorId.equals(userId)){
            return res.status(401).json({
                success:false,
                message:"Only the creator of this course can create a section",
            });
        }

        const newSection = await Section.create({sectionName, subSection:[]});
        const updatedCourseDetails = await Course.findOneAndUpdate({_id:courseId}, {$push:{courseContent: newSection._id}}, {new:true}).populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
        return res.status(200).json({
            success:true,
            updatedCourseDetails,
            message:"Section created successfully",
        });
    } catch (error) {
        console.log("Something went wrong in the create section handler");
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating the section",
        });
    }
}

exports.updateSection = async (req, res)=>{
    try {
        const {sectionName, sectionId, courseId} = req.body;
        if(!sectionName || !sectionId){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            });
        }

        const courseDetails = await Course.findOne({_id:courseId});
        const instructorId = courseDetails.instructor;
        const userId = req.user.id;
        if(!instructorId.equals(userId)){
            return res.status(401).json({
                success:false,
                message:"Only the creator of this course can update the section",
            });
        }

        const updatedSectionDetails = await Section.findOneAndUpdate({_id:sectionId}, {sectionName}, {new:true});
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            updatedSectionDetails,
        });

    } catch (error) {
        console.log("Something went wrong in the update section handler");
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating the section",
        });
    }
}

exports.deleteSection = async (req, res)=>{
    try {
        const {sectionId, courseId} = req.body;
        if(!sectionId){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            });
        }

        const courseDetails = await Course.findOne({_id:courseId});
        const instructorId = courseDetails.instructor;
        const userId = req.user.id;
        if(!instructorId.equals(userId)){
            return res.status(401).json({
                success:false,
                message:"Only the creator of this course can update the section",
            });
        }

        const section = await Section.findOneAndDelete({_id:sectionId});
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        });

    } catch (error) {
        console.log("Something went wrong in the delete section handler");
        return res.status(500).json({
            success:false,
            message:"Unable to delete, Something went wrong while deleting the section",
        });
    }
}