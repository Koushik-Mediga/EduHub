const express = require('express');
const router = express.Router();


const {auth} = require('../middlewares/auth')
const {updateProfile, deleteAccount, updateDisplayPicture, getUserDetails} = require('../controllers/Profile');

router.put('/updateProfile', auth, updateProfile);
router.delete('/deleteAccount',auth, deleteAccount);
router.put('/updateDisplayPicture', auth, updateDisplayPicture);
router.get('/getUserDetails', auth, getUserDetails);

module.exports = router; 