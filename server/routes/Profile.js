const express = require('express');
const router = express.Router();


const {auth, isStudent} = require('../middlewares/auth')
const {updateProfile, deleteAccount, updateDisplayPicture, getUserDetails, getUserEnrolledCourses} = require('../controllers/Profile');

router.put('/updateprofile', auth, updateProfile);
router.delete('/deleteaccount',auth, deleteAccount);
router.put('/updatedisplaypicture', auth, updateDisplayPicture);
router.get('/getuserdetails', auth, getUserDetails);
router.get('/enrolledcourses', auth, isStudent, getUserEnrolledCourses);

module.exports = router; 