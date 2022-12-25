const express = require('express');
const router = express.Router();

router.post("/scriptApi", async(req, res) => {
    const { priceValue, periodID } = req.body;
    const arr = Array.from(String(priceValue), Number);
    let sum = 0;
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    let ans = (sum / arr.length) ^ 0;
    
    if(ans % 2 === 0) {
        res.send({message: "Red", ans});
    }
    else {
        res.send({message: "Green", ans});
    }
});

module.exports = router;