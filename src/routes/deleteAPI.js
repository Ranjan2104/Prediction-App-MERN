const express = require('express')
require('mongoose');
const router = express.Router();
const LoginData = require('../models/userSchema')

router.post("/deleteApi", async(req, res) => {
    const { email } = req.body;
    LoginData.findOneAndDelete({ email : email }, (err, val) => {
        if(val) {
            res.send({ message : "User Deleted Successfully!!" });
        }
        else {
            res.send(err);
        }
    })
});

module.exports = router;