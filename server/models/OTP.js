const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const {otpSignupMailTemplate} = require('../utils/mailTemplates')
const otpSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires: 5*60,
    }
});

async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification email from EduHub", otpSignupMailTemplate(otp));
        console.log("Email sent successfully: ", mailResponse);
    }catch(e){
        console.log("Error occured while sending emails: ", e);
        throw e;
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model("OTP", otpSchema);