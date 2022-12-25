const express = require('express');
const cors = require('cors');
require('./db/dataBase');
const register = require('./routes/registerAPI');
const login = require('./routes/loginAPI');
const deleted = require('./routes/deleteAPI');
const otpsend = require('./routes/otpSentAPI');
const script = require('./routes/scriptAPI');

let port = process.env.PORT || 3030; 

const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors()) 
app.use(register);
app.use(login);
app.use(deleted);
app.use(otpsend);
app.use(script);

app.listen(port, () => {
  console.log(`Server is Running at port ${port}`)
})