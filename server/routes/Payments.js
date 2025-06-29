const express = require('express');
const router = express.Router();

const {capturePayment, verifyPayment} = require('../controllers/Payments');
const {auth, isStudent}  = require('../middlewares/auth')

router.post('/capturepayment', auth, isStudent, capturePayment);
router.post('/verifypayment', auth, isStudent, verifyPayment);

module.exports = router;