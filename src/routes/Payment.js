const express = require("express");
const Razorpay = require('razorpay');
const router = express.Router();
var crypto = require("crypto");
const mailmiddleware = require("../middleware/MailMiddleware")

var instance = new Razorpay({
    key_id: 'rzp_test_iqE6sdUe3x9j2y',
    key_secret: 'yzSCGCy2aeE2YjCHIpwVPSg3',
  });
router.post("/create/orderId",async (request,res)=>{
    console.log(request.body.amount)
    var options = {
        amount: request.body.amount,
        currency: "INR",
        receipt: "ajay_rece"
    };
    console.log("hellooo");
    instance.orders.create(options, function(err, or){
        console.log(or)
        res.json({order:or});
    });    
})
router.post("/api/payment/verify",(req,res)=>{
    let body=req.body.order_id + "|" + req.body.payment_id;   
     var expectedSignature = crypto.createHmac('sha256', 'yzSCGCy2aeE2YjCHIpwVPSg3')
     .update(body.toString()).digest('hex');
     var response = {"signatureIsValid":"false"}
     if(expectedSignature === req.body.signature)
     
      response={"signatureIsValid":"true"}
         res.send(response);
     });
module.exports = router;