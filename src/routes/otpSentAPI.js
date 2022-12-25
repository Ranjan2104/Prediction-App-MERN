const express = require('express')
require('mongoose');
const router = express.Router();
const LoginData = require('../models/userSchema')


router.post("/loginWithOtpApi", async(req, res) => {
    const { phoneNumber } = req.body;
    LoginData.findOne({ phoneNumber: phoneNumber }, ( err, val ) => {
        if(val) {
            if(phoneNumber === val.phoneNumber) {
                res.send({ message: "Verified Successfully" });
            }
        }
        else {
            res.send({ message: "Invalid Phone Number" });
        }
    });
});

module.exports = router;