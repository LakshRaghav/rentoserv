const express = require("express");
const userdata = require("../controller/userdata");
const router = express.Router();
const Mailmiddleware = require("../middleware/Mailmiddleware");

router.get("/getdetail",async (request,response)=>{
   const data = request.header("Authorization").split(" ")[1];
   const  result = await userdata.getUserData(data);
   response.json(result)
})
router.post("/getmailresponse",Mailmiddleware.main,async (request,response)=>{
    const data = request.body;
    console.log(data)
    response.json(data);
 })
 router.put("/userdata",async(request,response)=>{
   const data =request.body;
   const result = await userdata.updateUserOrder(data);
   response.json(result);
 })
 router.put("/googleuserdata",async(request,response)=>{
   const data =request.body;
   const result = await userdata.updateGoogleUserOrder(data);
   response.json(result);
 })
 router.post("/orderdescription",async(request,response)=>{
   const data =request.body;
   const result = await userdata.updateOrderDescription(data);
   response.json(result);
 })
 router.get("/invoiceuser/",async(request,response)=>{
   const data =request.query.order_id;
   const result = await userdata.getInvoiceUserData(data);
   response.json(result);
 })
 router.get("/invoicegoogle/",async(request,response)=>{
   const data =request.query.order_id;
   const result = await userdata.getInvoiceGoogleUserData(data);
   response.json(result);
 })
module.exports = router;