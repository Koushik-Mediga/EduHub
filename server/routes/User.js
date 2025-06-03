const {login, signup, sendOTP, changePassword} = require('../controllers/Auth');
const {resetPasswordToken, resetPassword} = require('../controllers/ResetPassword');

const {auth} = require('../middlewares/auth');

const express = require('express');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/sendotp', sendOTP);
router.post('/changepassword', auth, changePassword);

router.post('/resetpasswordtoken', resetPasswordToken);
router.post('/resetpassword', resetPassword);

module.exports = router;
