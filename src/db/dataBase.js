const mongoose = require('mongoose');

const password = encodeURIComponent("Amresh@2104");
const mongoUrl = `mongodb+srv://amresh:${password}@cluster0.4uvhovb.mongodb.net/TestDatabase?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DataBase Connected Successfully");
})
.catch((e) => console.log(e));
