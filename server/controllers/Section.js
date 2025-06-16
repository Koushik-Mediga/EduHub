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
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course not found with the given id"
            })
        }
        const instructorId = courseDetails.instructor;
        const userId = req.user.id;
        console.log("Instructor id: ", instructorId, " userId : ", userId);
        if(!instructorId.equals(userId)){
            return res.status(401).json({
                success:false,
                message:"Only the creator of this course can create a section",
            });
        }

        const newSection = await Section.create({ sectionName, subSection: [] });

        courseDetails.courseContent.push(newSection._id);
        await courseDetails.save();

        const updatedCourseDetails = await Course.findById(courseId)
        .populate({ path: "instructor", populate: { path: "additionalDetails" } })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: { path: "subSection" },
        });
      return res.status(200).json({
            success:true,
            course:updatedCourseDetails,
            section: newSection,
            message:"Section created successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
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
        const course = await Course.findOne({_id:courseId}).populate({ path: "instructor", populate: { path: "additionalDetails" } })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: { path: "subSection" },
        });
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            section: updatedSectionDetails,
            course
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
                message:"Section Not Found"
            });
        }

        const courseDetails = await Course.findOne({_id:courseId});
        const instructorId = courseDetails.instructor;
        const userId = req.user.id;
        if(!instructorId.equals(userId)){
            return res.status(401).json({
                success:false,
                message:"Only the creator of this course can delete the section",
            });
        }
        const section = await Section.findOne({_id:sectionId});
        await SubSection.deleteMany({ _id: { $in: section.subSection } });

        const course = await Course.findOneAndUpdate({_id:courseId}, {
            $pull: { courseContent: sectionId },
        }, {new: true}).populate({ path: "instructor", populate: { path: "additionalDetails" } })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: { path: "subSection" },
        });

        await Section.findOneAndDelete({_id:sectionId});

        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            course
        });

    } catch (error) {
        console.log(e.message);
        return res.status(500).json({
            success:false,
            message:e.message,
        });
    }
}