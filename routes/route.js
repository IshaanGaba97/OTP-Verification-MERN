const router = require('express').Router();

const { getOTP, checkOTP } = require('../controller/appController.js')


router.post('/user/getOtp', getOTP);
router.post('/user/checkOtp', checkOTP);


module.exports = router;