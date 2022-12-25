const express = require('express')
require('mongoose');
const router = express.Router();
const LoginData = require('../models/userSchema')

router.post("/loginApi", async(req, res) => {
    const { email, password } = req.body;
    LoginData.findOne({ email: email }, ( err, loginData ) => {
        if(loginData) {
            if(password === loginData.password) {
                res.send({ message: "Login Successfully" })
            }
            else {
                res.send({ message: "Password didn't match" })
            }
        }
        else {
            res.send({ message: "You're not Found" });
        }
    });
});

module.exports = router;