const {login, signup, sendOTP, changePassword} = require('../controllers/Auth');
const {resetPasswordToken, resetPassword} = require('../controllers/ResetPassword');

const {auth} = require('../middlewares/auth');

const express = require('express');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/sendotp', sendOTP);
router.post('/changePassword', auth, changePassword);

router.post('/resetPasswordToken', resetPasswordToken);
router.post('/resetPassword', resetPassword);

module.exports = router;
