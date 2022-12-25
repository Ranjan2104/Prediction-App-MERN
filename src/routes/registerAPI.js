const express = require('express')
require('mongoose');
const router = express.Router();
const RegisterData = require('../models/userSchema')

router.post("/registerApi", async(req, res) => {
    const { name, phoneNumber, email, password } = req.body;
    RegisterData.findOne({ email: email }, (err, registerData) => {
        if(registerData) {
            res.send({ message: "User already Registered" })
        }
        else {
            const registerData = new RegisterData({
                name,
                phoneNumber,
                email,
                password,
            })
            registerData.save( err => {
                if(err) {
                    res.send(err)
                } else {    
                    res.send({ message: "Successfully Registered User!" })
                }
            }) 
        }
    })    
});

module.exports = router
