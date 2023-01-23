require('dotenv').config({path:"../.env"});
const express = require("express");
const user = require("../controller/user");
const router = express.Router();
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

router.post("/signup",async (request,response)=>{
   const data = request.body;
   const  result = await user.signUp(data);
   response.json(result)
})
router.post("/login",async (request,response)=>{
    const data = request.body;
    const  result = await user.login(data);
    response.json(result)
 })
 router.post("/google_login",async (request,response)=>{
   const data  = request.body;
   const ticket = await client.verifyIdToken({
       idToken: data.token,
       audience: process.env.CLIENT_ID
   });  
   if(ticket)
   {
      const result = await user.google_login(ticket,data.token);   
      response.status(201)
      response.json(result)
   } 
   else{
      response.status("Failed");
   }
})
module.exports = router;
