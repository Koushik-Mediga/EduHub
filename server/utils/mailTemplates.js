const  deleteAccountMailTemplate = (userName)=>{
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f9fa;">
        <h2 style="color: #dc3545;">EduHub Account Deletion Confirmation</h2>
        <p>Dear ${userName},</p>
        <p>We regret to inform you that your account with <strong>EduHub</strong> has been successfully deleted as per your request or due to policy violations.</p>
        <p>If you believe this was a mistake or require any further assistance, please do not hesitate to contact our support team.</p>
        <br/>
        <p>Thank you for being a part of EduHub.</p>
        <p>Best regards,<br/>EduHub Team</p>
        </div>
    `;
}

const otpSignupMailTemplate = (otp)=>{
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #eef2f7;">
        <h2 style="color: #007bff;">EduHub Signup Verification</h2>
        <p>Thank you for signing up with <strong>EduHub</strong>! </p>
        <p>Please use the OTP below to verify your email address and complete your registration:</p>
        <h3 style="color: #28a745;">${otp}</h3>
        <p>This OTP is valid for a limited time. Please do not share it with anyone.</p>
        <br/>
        <p>Welcome aboard!</p>
        <p>Best regards,<br/>EduHub Team</p>
        </div>
    `;
}

const accountRegisteredMailTemplate = (userName)=>{
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #e9f7ef;">
        <h2 style="color: #28a745;">Welcome to EduHub!</h2>
        <p>Dear ${userName},</p>
        <p>Your account has been successfully created on <strong>EduHub</strong>.</p>
        <p>You can now log in and start exploring our features and resources.</p>
        <br/>
        <p>We're excited to have you with us!</p>
        <p>Best regards,<br/>EduHub Team</p>
        </div>
    `;
}

module.exports = {accountRegisteredMailTemplate, otpSignupMailTemplate, deleteAccountMailTemplate};