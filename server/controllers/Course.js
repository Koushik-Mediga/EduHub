const Course = require('../models/Course');
const Category = require('../models/Category');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config();

exports.createCourse = async (req, res)=>{
    try {
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;
        const thumbnail = req.files.thumbnail;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor not found, please register first",
            });
        }

        const existingCategory = await Category.findById(category);
        if(!existingCategory){
            return res.status(404).json({
                success:false,
                message:"Category not found, please create a Category first",
            });
        }

        const uploadedThumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const course = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail:uploadedThumbnailImage.secure_url,
            category: existingCategory._id,
            tag:[],
        });

        const updatedCategoryDetails = await Category.findByIdAndUpdate(existingCategory._id, {$push: {courses: course._id}}, {new:true});

        const updatedInstructorDetails = await User.findByIdAndUpdate(userId, {$push: {courses: course._id}}, {new:true});
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            course
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.updateCourse = async (req, res)=>{
    try {
        const courseId = req.body.courseId;
        const thumbnail = req.files?.thumbnail;

        let payload = {};
        
        const userId = req.user.id;
        if(req.body.courseName) payload.courseName = req.body.courseName;
        if(req.body.courseDescription) payload.courseDescription = req.body.courseDescription;
        if(req.body.price) payload.price = req.body.price;
        if(req.body.category) payload.category = req.body.category;
        if(req.body.whatYouWillLearn) payload.whatYouWillLearn = req.body.whatYouWillLearn;
        if(thumbnail) payload.thumbnail = thumbnail;


        if(thumbnail){
            const uploadedThumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            payload.thumbnail = uploadedThumbnailImage.secure_url
        }

        const course = await Course.findOneAndUpdate({_id:courseId},payload, {new:true}).populate({path:"instructor", populate:{path:"additionalDetails"}}).populate({path:'category'}).populate({path:'ratingAndReviews'}).populate({path:'courseContent', populate:{path:'subSection'}}).exec();

        return res.status(200).json({
            success:true,
            message:"Course updated successfully",
            course
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.showAllCourses = async (req, res)=>{
    try {
        const allCourses = await Course.find({}, {
            courseName:true,
            courseDescription:true,
            price:true,
            instructor:true,
            category:true,
            thumbnail:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
        }).populate("instructor").exec();

        res.status(200).json({
            success:true,
            message:"Fetched all Courses successfully",
            courses: allCourses,
        });
    } catch (error) {
        console.log("Error occured while fetching all the courses");
        return res.status(500).json({
            success:false,
            message:"Something went wrong in the show all courses handler",
        });
    }
}

exports.getCourseDetails = async (req, res)=>{
    try {
        const {courseId} = req.body;
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Please provide valid course ID"
            });
        }
        const courseDetails = await Course.findOne({_id:courseId}).populate({path:"instructor", populate:{path:"additionalDetails"}}).populate({path:'category'}).populate({path:'ratingAndReviews'}).populate({path:'courseContent', populate:{path:'subSection'}}).exec();
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Could not find course with the given id",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            courseDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getMyCourses = async (req, res)=>{
    try {
        const userId = req.user.id;
        const courses = await Course.find({instructor:userId}).populate({path:"instructor", populate:{path:"additionalDetails"}}).populate({path:'category'}).populate({path:'ratingAndReviews'}).populate({path:'courseContent', populate:{path:'subSection'}}).exec();
        if(!courses){
            return res.status(404).json({
                success:false,
                message:"No courses found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"All courses fetched successfully",
            courses
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            success:false,
        })
    }
}