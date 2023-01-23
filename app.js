const express = require("express");
const auth = require("./src/routes/Auth")
const user = require("./src/routes/userdetail")
const data = require("./src/routes/Data")
const payment = require("./src/routes/Payment");
const app = express();
const AuthMiddleware = require("./src/middleware/AuthMiddleware");
const cookieParser = require("cookie-parser");

var cors = require('cors');
app.use(cookieParser());
app.use(express.json());
app.use(cors())
app.use("/image",express.static(__dirname+"/public/upload"))
 app.use((req,res,next)=>{
 res.setHeader('Access-Control-Allow-Origin','*')
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 res.setHeader("Access-Control-Allow-Headers","X-Requested-Width,Content-type")
 res.setHeader("Access-Control-Allow-Credentials",true)
 next();
})
app.use("/auth",auth);
app.use("/car",AuthMiddleware.isValidToken,data);
app.use("/user",AuthMiddleware.isValidToken,user);
app.use("/payment",payment)
module.exports = app;