const {instance} = require('../config/razorpay');
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");


exports.capturePayment = async (req, res)=>{
    const {course_id} = req.body;
    const userId = req.user.id;
    if(!course_id){
        return res.json({
            success:false,
            message:"Please provide a valid a course Id"
        });
    }
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success:false,
                message:"Could not find the course"
            });
        }

        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is already enrolled"
            })
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:e.message,
        })
    }

    const amount = course.price;
    const currency = "INR";

    const options = {
        amount:amount*100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId
        }
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        return res.status(200).json({
            success:true,
            courseName: course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount: paymentResponse.amount,
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:e.message,
        })
    }
}

exports.verifySignature = async (req, res)=>{
    const webhookSecret = "";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature!== digest){
        return res.status(400).json({
            success:false,
            message:"Payment Not Authorized",
        })
    }
        console.log("Payment is authorized");

        const {courseId, userId} = req.body.payload.payment.entity.notes;
        try{
            const enrolledCourse = Course.findOneAndUpdate({_id: courseId}, {$push:{studentsEnrolled:userId}}, {new:true});

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                });
            }

            const enrolledStudent = await User.findOneAndUpdate({_id:userId}, {$push:{courses:courseId}}, {new:true});

            if(!enrolledStudent){
                return res.status(500).json({
                    success:false,
                    message:"Student not found"
                });
            }

            await mailSender(enrolledStudent.email, "Course Enrolled in EduHub", "You have enrolled in the course")

            return res.status(200).json({
                success:"true",
                message:"Enrolled in Course Successfully"
            })
        }catch(e){
            console.log(e);
            return res.status(500).json({
                success:false,
                message:e.message,
            })
        }
}