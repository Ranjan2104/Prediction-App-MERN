const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        phoneNumber: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        } 
    }
);
const RegisterData = new mongoose.model("RegisterData", userSchema); 

module.exports = RegisterData;