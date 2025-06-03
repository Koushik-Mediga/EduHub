const express = require('express');
const router = express.Router();


const {auth} = require('../middlewares/auth')
const {updateProfile, deleteAccount, updateDisplayPicture, getUserDetails} = require('../controllers/Profile');

router.put('/updateprofile', auth, updateProfile);
router.delete('/deleteaccount',auth, deleteAccount);
router.put('/updatedisplaypicture', auth, updateDisplayPicture);
router.get('/getuserdetails', auth, getUserDetails);

module.exports = router; 