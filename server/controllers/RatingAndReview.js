const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');

exports.createRatingAndReview = async (req, res)=>{
    try {
        const {rating, review, courseId} = req.body;
        const userId = req.user.id;
        if(!rating || !review || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        const courseDetails = await Course.findOne({_id:courseId, studentsEnrolled: {$elemMatch:{$eq: userId}}});
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Could not find the course with the given id",
            })
        }
        const existingRatingAndReview = RatingAndReview.findOne({user:userId, course:courseId});
        if(existingRatingAndReview){
            return res.status(401).json({
                success:false,
                message:"User has already reviewed this course",
            })
        }
        const ratingReview = await RatingAndReview.create({rating, review, user:userId, course:courseId});
        await Course.findByIdAndUpdate({_id:courseId}, {$push:{ratingAndReviews:ratingReview}});
        return res.status(200).json({
            success:true,
            message:"Rating and Review created successfully",
        });
    } catch (error) {
        console.log("Something went wrong in the createRatingAndReview handler");
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.getAverageRating = async (req, res)=>{
    try {
        const courseId = req.body.courseID;
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating: {$avg:"$rating"},
                }
            }
        ]);
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }
        return res.status(200).json({
            success:true,
            message:"No rating till no",
            averageRating: 0,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.getAllRating = async (req, res)=>{
    try {
        const allReviews = await RatingAndReview.find({}).sort({rating:'desc'}).populate({path:"user", select:"firstName lastName email image"}).populate({path:"course", select:"courseName"}).exec();
        return res.status(200).json({
            success:true,
            message:"fetched all rating and review successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}