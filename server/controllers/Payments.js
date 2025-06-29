const {instance} = require('../config/razorpay');
const Course = require("../models/Course");
const mongoose = require('mongoose');
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");



exports.capturePayment = async (req, res)=>{
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.json({
            success:false,
            message:"Please provide the valid course Ids"
        });
    }

    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({
                    success:false,
                    message:"Course not found"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already enrolled in the course"});
            }

            totalAmount += course.price;
        }
        catch(error){
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency:"INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:e.message,
        })
    }
}


exports.verifyPayment = async (req, res)=>{
    console.log(req.body);
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses){
        return res.status(400).json({
            success:false,
            message:"Payment Failed"
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");
    
    if(expectedSignature === razorpay_signature){
        await enrollStudents(courses, userId, res);
        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        });
    }

    return res.status(200).json({
        success:false,
        message:"Payment Failed"
    });
}

const enrollStudents = async (courses, userId, res)=>{
    try {
        if(!courses || !userId){
            return res.status(400).json({
                success:false,
                message:"Please provide data for courses or userId"
            });
        }
        
        for(const courseId of courses){
            const enrolledCourse = await Course.findByIdAndUpdate(courseId, {$push: {studentsEnrolled: userId}}, {new:true});
            if(!enrolledCourse){
                return res.status(404).json({
                    success:false,
                    message:"Course not found",
                });
            }

            const enrolledStudent = await User.findByIdAndUpdate(userId, {$push: {courses: courseId}}, {new:true});
            await mailSender(enrolledStudent.email, `Successfully enrolled into ${enrolledCourse.courseName}`, `You have enrolled for the course ${enrolledCourse.courseName}`);
        }
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}




// exports.capturePayment = async (req, res)=>{
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     if(!course_id){
//         return res.json({
//             success:false,
//             message:"Please provide a valid a course Id"
//         });
//     }
//     let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course){
//             return res.json({
//                 success:false,
//                 message:"Could not find the course"
//             });
//         }

//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"Student is already enrolled"
//             })
//         }
//     }
//     catch(e){
//         console.log(e)
//         return res.status(500).json({
//             success:false,
//             message:e.message,
//         })
//     }

//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount:amount*100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId
//         }
//     }

//     try{
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         return res.status(200).json({
//             success:true,
//             courseName: course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount: paymentResponse.amount,
//         })
//     }catch(e){
//         console.log(e);
//         return res.status(500).json({
//             success:false,
//             message:e.message,
//         })
//     }
// }

// exports.verifySignature = async (req, res)=>{
//     const webhookSecret = "";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature!== digest){
//         return res.status(400).json({
//             success:false,
//             message:"Payment Not Authorized",
//         })
//     }
//         console.log("Payment is authorized");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;
//         try{
//             const enrolledCourse = Course.findOneAndUpdate({_id: courseId}, {$push:{studentsEnrolled:userId}}, {new:true});

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found"
//                 });
//             }

//             const enrolledStudent = await User.findOneAndUpdate({_id:userId}, {$push:{courses:courseId}}, {new:true});

//             if(!enrolledStudent){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Student not found"
//                 });
//             }

//             await mailSender(enrolledStudent.email, "Course Enrolled in EduHub", "You have enrolled in the course")

//             return res.status(200).json({
//                 success:"true",
//                 message:"Enrolled in Course Successfully"
//             })
//         }catch(e){
//             console.log(e);
//             return res.status(500).json({
//                 success:false,
//                 message:e.message,
//             })
//         }
// }